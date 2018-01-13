import * as React from 'react';
import * as cls from 'classnames';
import * as noop from 'lodash/noop';
import { toType, eachBind, hasValue, updateArr } from '../util';
import { Popover, Icon, Tag } from '..';

import { transformOptions } from './util';
import { Option } from './option';
import './select.less';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
    options?: any[] | Object;
    mode?: 'single' | 'multiple' | 'input';
    onChange?: any;
}

interface SelectState {
    value: any[];
}

export class Select extends React.PureComponent<SelectProps, SelectState> {
    options: any[];
    public static Option = Option;
    public static defaultProps = {
        mode: 'single',
        onChange: noop,
        placeholder: '请选择'
    };

    constructor(p) {
        super(p);
        let value = p.value || p.defaultValue;
        this.state = { value: this.safeValue(value) };
        eachBind(['show', 'hide', 'handleChange', 'handleMultipleRemove'], this);
    }
    safeValue(v) {
        return v ? [].concat(v) : [];
    }
    getOptions() {
        let { options, children } = this.props;

        if (children) {
            return React.Children.toArray(children).map(({ key, props }: any) => ({ ...props, key }));
        }

        return transformOptions(options);
    }
    componentWillReceiveProps(nextProps) {
        if (hasValue(nextProps)) {
            this.setState({ value: this.safeValue(nextProps.value) });
        }
    }
    show() {
        if (this.props.disabled) return;
        this.refs.popover['handleShow']();
    }
    hide() {
        this.refs.popover['handleHide']();
    }
    handleChange(e) {
        this.setState({ value: [e.target.value] });
    }
    fireChange(nextValue, content?) {
        let { mode, onChange } = this.props;
        let value = this.state.value.slice();

        if (mode === 'multiple') {
            value = updateArr(value, nextValue);
        } else {
            value = [nextValue];
            this.hide();
        }

        if (!hasValue(this.props)) {
            this.setState({ value });
        }

        onChange(value);
    }

    handleMultipleRemove(e) {
        let { value } = e.target.dataset;
        setTimeout(() => this.fireChange(value), 0);
    }

    renderMultipleTags(values: any[]) {
        if (values.length) {
            let options = this.options.filter(e => values.indexOf(e.value) > -1)
            return options.length && options.map(option => (
                <Tag
                    key={option.value}
                    close
                    skin="primary-line"
                    data-value={option.value}
                    onClick={this.handleMultipleRemove}
                >
                    {option.text || option.children}
                </Tag>
            ));
        }
    }

    renderTarget() {
        let { mode, placeholder, disabled, name, ...props } = this.props;
        let { value } = this.state;
        let classname = cls('select-target', 'select-' + mode, { disabled });
        let target;

        if (mode === 'single') {
            let option = this.options.filter(e => e.value === '' + value[0])[0];
            target = option && (option.children || option.text);
        }
        if (mode === 'multiple') {
            target = this.renderMultipleTags(value);
        }

        if (mode === 'input') {
            target = (
                <input name={name} value={value[0] || ''} onChange={this.handleChange} placeholder={placeholder} />
            );
        }

        return (
            <div className={classname} onClick={this.show}>
                <div className="select-label">{target || placeholder}</div>
                <div className="select-more-icon">
                    <Icon type="up" />
                    <Icon type="down" />
                </div>
            </div>
        );
    }

    renderContent() {
        let globalValue = this.state.value;
        let options = (this.options = this.getOptions());

        if (options.length) {
            return options.map(({ key, value, disabled, ...props }) => {
                let checked = globalValue.indexOf(value) > -1;
                let onClick = disabled ? noop : this.fireChange.bind(this, value);
                return <Option {...props} key={key || value} checked={checked} disabled={disabled} onClick={onClick} />;
            });
        }

        return <Option disabled>没有数据</Option>;
    }

    render() {
        let { className, style } = this.props;
        return (
            <Popover
                ref="popover"
                placement="bottom-start"
                trigger={false}
                delay={0}
                prefix="select"
                arrowVisible={false}
                className={className}
                style={style}
                content={this.renderContent()}
            >
                {this.renderTarget()}
            </Popover>
        );
    }
}
