import { createElement, Component, cloneElement, HtmlHTMLAttributes, ReactElement } from 'react';
import * as cls from 'classnames';

import { noop, bindAll, hasValue, type } from '@components/util';
import { Consumer, IContext } from './context';
import { validateField } from '../form/field-verify';

interface FormRule {
    rule: RegExp | Function | string;
    message?: string;
}

interface FormItemProps {
    name: string;
    children: ReactElement<any>;

    value?: any;
    defaultValue?: any;
    onChange?: any;

    rules?: FormRule[];
    verifyFirst?: boolean;
    verifyTrigger?: string;

    // value的来源属性
    valuePropName?: 'value' | 'checked' | 'files';
}
interface FormItemState {}

class FormItem extends Component<FormItemProps & { context: IContext }, FormItemState> {
    public static defaultProps: Partial<FormItemProps> = {
        defaultValue: '',
        onChange: noop,

        verifyFirst: true,
        verifyTrigger: 'onSubmit',

        valuePropName: 'value'
    };

    public static getDerivedStateFromProps (nextProps) {
        if ('value' in nextProps) {
            nextProps.context.unsafe_updateFieldValue(nextProps.name, nextProps.value);
        }
        return null;
    }

    constructor (p) {
        super(p);
        bindAll(this, 'handleChange', 'validate');
        this['state'] = {};
    }

    validate (value, status) {
        let { verifyFirst, verifyTrigger, rules, context } = this.props;

        if (verifyTrigger!.includes(status)) {
            return validateField(value, { verifyFirst, rules }, context.fields);
        }
    }

    handleChange (e) {
        let { name, valuePropName, context, ...props } = this.props;

        if ('value' in props) {
            props.onChange(e);
        } else {
            let value = e && e.target ? e.target[valuePropName!] : e;
            let error = this.validate(value, 'onChange');
            context.registry(name, { value, error });
        }
    }
    componentDidMount () {
        let { name, defaultValue, context, ...props } = this.props;

        let value = 'value' in props ? props.value : defaultValue;
        let error = this.validate(value || '', 'didMount');

        context.registry(name, { value, error, validate: this.validate });
    }

    render () {
        let { name, children, valuePropName, context } = this.props;
        let field = context.fields[name];

        if (!field) {
            return null;
        }

        return cloneElement(children, {
            name,
            [valuePropName!]: field.value,
            onChange: this.handleChange
        });
    }
}

export function FormItemContext (props: FormItemProps) {
    return <Consumer>{(context) => <FormItem context={context} {...props} />}</Consumer>;
}

export function FormErrorContext ({ name, children, ...props }: any) {
    return (
        <Consumer>
            {({ fields }) => {
                let field = fields[name];

                if (!field) {
                    return null;
                }
                return type(children) === 'function' ? (
                    children(field.error, field)
                ) : (
                    <span {...props}>{field.error}</span>
                );
            }}
        </Consumer>
    );
}
