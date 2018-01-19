import * as React from 'react';
import * as cls from 'classnames';
import * as noop from 'lodash/noop';
import * as identity from 'lodash/identity';
import * as debounce from 'lodash/debounce';
import * as flow from 'lodash/flow';
import { toType, eachBind, hasValue, updateArr } from '../util';
import { Popover, Icon, Tag, List, Input } from '..';

import { transformOptions } from './util';
import { Option } from './option';
import './select.less';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
	options?: any[] | Object;
	mode?: 'single' | 'multiple';
	onChange?: any;
	mapOption?: any;
	filter?: boolean;
}

interface SelectState {
	value: any[];
	search: string;
}

export class Select extends React.PureComponent<SelectProps, SelectState> {
	public static Option = Option;
	public static defaultProps = {
		mode: 'single',
		onChange: noop,
		placeholder: '请选择',
		mapOption: identity
	};

	private __options: any[];
	private __caches: object;
	handleSearch: any;
	constructor(props) {
		super(props);

		let value = this.safeValue(props.value || props.defaultValue);
		this.state = { value, search: '' };
		this.setOptions(props, value);
		eachBind([ 'show', 'hide', 'handleMultipleRemove', 'renderOption' ], this);
		this.handleSearch = flow((e) => e.target.value, debounce((search) => this.setState({ search }), 300));
	}
	safeValue(v) {
		return v ? [].concat(v) : [];
	}

	setOptions({ options, children }, value) {
		Object.assign(this, transformOptions(options || React.Children.toArray(children), value));
	}

	componentWillReceiveProps(nextProps) {
		if (hasValue(nextProps) && this.props.value !== nextProps.value) {
			this.setState({ value: this.safeValue(nextProps.value) });
		}
	}
	componentWillUpdate(nextProps, { value }) {
		this.setOptions(nextProps, value);
	}

	show() {
		if (this.props.disabled) return;
		this.refs.popover['handleShow']();
	}

	hide() {
		this.refs.popover['handleHide']();
	}

	fireChange(option) {
		let { mode, onChange, name } = this.props;
		let value, fireValue;

		if (mode === 'multiple') {
			fireValue = value = updateArr(this.state.value.slice(), option.value);
			this.refs.popover['update']();
		} else {
			value = [ (fireValue = option.value) ];
			this.hide();
		}

		this.setState({ value });
		onChange(fireValue, name);
	}

	handleMultipleRemove(e) {
		let { value } = e.target.dataset;
		// 延迟是为了不与popover组建的关闭事件冲突
		setTimeout(() => this.fireChange({ value }), 0);
	}

	renderMultipleTags() {
		let { __caches } = this;
		let { value } = this.state;
		return (
			value.length &&
			value.map((val) => {
				let option = __caches[val];
				return (
					<Tag
						key={option.value}
						close
						skin="primary-line"
						data-value={option.value}
						onClick={this.handleMultipleRemove}
					>
						{option.children}
					</Tag>
				);
			})
		);
	}

	renderTarget() {
		let { mode, placeholder, disabled, name, ...props } = this.props;
		let firstValue = this.state.value[0] || '';
		let classname = cls('select-target', 'select-' + mode, { disabled });
		let target;

		if (mode === 'single') {
			let option = this.__options.find((e) => e.value === firstValue);
			target = option && option.children;
		} else if (mode === 'multiple') {
			target = this.renderMultipleTags();
		}

		return (
			<div className={classname}>
				{target ? (
					<div className="select-label">{target}</div>
				) : (
					<span className="select-placeholder">{placeholder}</span>
				)}
				<div className="select-more-icon">
					<Icon type="up" />
					<Icon type="down" />
				</div>
			</div>
		);
	}

	renderOption(option) {
		let { mapOption } = this.props;
		let { value } = this.state;
		let onClick = option.disabled ? noop : this.fireChange.bind(this, option);
		return Option({ ...mapOption(option), onClick });
	}

	renderContent() {
		let { mode, filter } = this.props;
		let { search } = this.state;
		let renderOptions = this.__options;

		let filterInput;
		if (filter) {
			filterInput = (
				<div className="search">
					<Input onChange={this.handleSearch} icon="search:right" />
				</div>
			);
			if (search) {
				renderOptions = renderOptions.filter((option) => option.filter.match(search));
			}
		}

		let list = renderOptions.length ? (
			<List rowKey="value" className="select-list" options={renderOptions} renderItem={this.renderOption} />
		) : (
			<Option disabled>没有数据</Option>
		);

		return (
			<div>
				{filterInput}
				{list}
			</div>
		);
	}

	render() {
		let { className, style, name } = this.props;
		return (
			<Popover
				ref="popover"
				placement="bottom-start"
				trigger='click'
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
