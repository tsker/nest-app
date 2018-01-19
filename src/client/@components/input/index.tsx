import * as React from 'react';
import * as cls from 'classnames';
import * as noop from 'lodash/noop';
import { Icon, Popover } from '..';
import { Option } from '../select/option';
import './index.less';
import { eachBind, hasValue } from '@components/util';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
	prefix?: string;
	icon?: string;
	options?: string[];
	suffix?: boolean;
}
interface InputState {
	value: string;
}
export class Input extends React.PureComponent<InputProps, InputState> {
	public static defaultProps = {
		onClick: noop,
		onChange: noop,
		icon: ''
	};

	constructor(props) {
		super(props);
		this.state = { value: props.value || '' };
		eachBind([ 'handleChange' ], this);
	}

	componentWillReceiveProps(nextProps) {
		if (hasValue(nextProps)) {
			this.setState({ value: nextProps.value });
		}
	}

	handleChange({ target }) {
		let { value } = target.nodeName === 'INPUT' ? target : target.dataset;

		if (!hasValue(this.props)) {
			this.setState({ value });
		}
		this.props.onChange!(value);
		this.refs.popover['handleHide']()
	}

	renderOptions(options, input, suffix) {
		let { value } = this.state;
		let cacheValue = value.replace(/\@.*/, '');

		options = suffix
			? options.map((option) => cacheValue + option)
			: options.filter((option) => option.match(value));

		let renderOptions = options.length ? (
			options.map((option) => (
				<div key={option} className="select-option" data-value={option} onClick={this.handleChange}>
					{option}
				</div>
			))
		) : (
			<div className="select-option disabled">没有数据</div>
		);

		return (
			<Popover
				ref="popover"
				placement="bottom-start"
				trigger="click"
				delay={0}
				prefix="input"
				arrowVisible={false}
				content={renderOptions}
			>
				{input}
			</Popover>
		);
	}
	render() {
		let { className, prefix, icon, onClick, options, suffix, ...props } = this.props;
		let [ type, pos = 'left' ] = icon!.split(':');
		let { value } = this.state;

		let labelCls = cls('input-label', className, type && 'input-icon-' + pos);
		let inputCls = 'input';
		if (prefix) {
			labelCls = cls(labelCls, prefix + '-input-label');
			inputCls = cls(inputCls, prefix + '-input');
		}

		let input = (
			<label className={labelCls}>
				<input {...props} className={inputCls} value={value} onChange={this.handleChange} />
				{type && <Icon type={type} onClick={onClick} />}
			</label>
		);

		if (options && options.length) {
			input = this.renderOptions(options, input, suffix);
		}

		return input;
	}
}
