import { createElement, Component, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import { noop, bindAll } from '@components/util';
import { Consumer, Provider, IContext } from './context';
import { FormItemContext, FormErrorContext } from './form-item';
import './form.less';

interface FormProps extends HtmlHTMLAttributes<HTMLFormElement> {
    onSubmit: (x: IContext['fields']) => void;
}
interface FormState {
    context: IContext;
}

export class Form extends Component<FormProps, FormState> {
    public static Item = FormItemContext;
    public static Error = FormErrorContext;
    public static Context = Consumer;
    public static defaultProps: Partial<FormProps> = {
        onSubmit: noop
    };

    constructor (p) {
        super(p);

        bindAll(this, 'registry', 'fireSubmit', 'unsafe_updateFieldValue');

        this.state = {
            context: {
                fields: {},
                registry: this.registry,
                unsafe_updateFieldValue: this.unsafe_updateFieldValue
            }
        };
    }

    registry (name, field) {
        this.setState(({ context }) => {
            let newField = {
                ...context.fields[name],
                ...field
            };

            return {
                context: {
                    ...context,
                    fields: {
                        ...context.fields,
                        [name]: newField
                    }
                }
            };
        });
    }

    setFields (fields) {
        this.setState(({ context }) => {
            return {
                context: {
                    ...context,
                    fields: {
                        ...context.fields,
                        ...fields
                    }
                }
            };
        });
    }

    unsafe_updateFieldValue (name, value) {
        let field = this.state.context.fields[name];
        if (!field) {
            return;
        }

        field.value = value;
    }

    fireSubmit (e?) {
        e && e.preventDefault();
        let { fields } = this.state.context;
        let result = {};
        let errors;

        Object.keys(fields).forEach((name) => {
            let { value, validate } = fields[name];
            let error = validate(value, 'onSubmit');
            fields[name].error = error;

            if (error) {
                errors = errors || {};
                errors[name] = error;
            }

            result[name] = value;
        });

        this.setFields(fields);
        if (errors) {
            return console.warn({ errors, result, fields });
        }
        this.props.onSubmit(result);
    }

    render () {
        let { className } = this.props;
        return (
            <Provider value={this.state.context}>
                <form onSubmit={this.fireSubmit} className={cls('form', className)}>
                    {this.props.children}
                </form>
            </Provider>
        );
    }
}
