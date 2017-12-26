import * as React from 'react';
import * as cls from 'classnames';
import { Checkbox } from './checkbox';

interface CheckboxGroupProps {
    options?: any[] | Object;
    className?: 'string';
    onChange?: any;
    value?: string[];
    defaultValue?: string[];
}
interface CheckboxGroupState {
    value: string[];
}
export class CheckboxGroup extends React.Component<
    CheckboxGroupProps,
    CheckboxGroupState
> {
    public static defaultProps = {
        defaultValue: []
    };

    constructor(p) {
        super(p);
        this.handleChange = this.handleChange.bind(this);
        this.renderCheckbox = this.renderCheckbox.bind(this);

        this.state = {
            value: p.value || p.defaultValue
        };
    }

    componentWillReceiveProps({ value }) {
        if (
            value !== undefined &&
            value.toString() !== this.state.value.toString()
        ) {
            this.setState({ value });
        }
    }

    handleChange(e) {
        let { checked, value } = e.target;
        let selects = [...this.state.value];
        let { onChange } = this.props;
        if (checked) {
            selects = selects.concat(value);
        } else {
            let index = selects.findIndex(box => box === value);
            selects.splice(index, 1);
        }

        let hasValueInProps = 'value' in this.props;
        if (!hasValueInProps) {
            this.setState({ value: selects });
        }
        onChange && onChange(selects);
    }

    renderCheckbox(props) {
        let { text, value } = props;
        if (typeof props !== 'object') {
            text = value = props;
        }
        let checked = this.state.value.indexOf(value) > -1;

        return (
            <Checkbox
                key={value}
                value={value}
                checked={checked}
                onChange={this.handleChange}
            >
                {text}
            </Checkbox>
        );
    }

    getSafeOptions(options) {
        let type = Object.prototype.toString.call(options);
        if (type === '[object Object]') {
            return Object.keys(options).map(value => {
                return this.renderCheckbox({ text: options[value], value });
            });
        } else {
            return options.map(this.renderCheckbox);
        }
    }

    render() {
        let { className, options } = this.props;
        let props: any = {};
        if (options) {
            props.children = this.getSafeOptions(options);
        }
        return <div className={cls('checkbox-group', className)} {...props} />;
    }
}
