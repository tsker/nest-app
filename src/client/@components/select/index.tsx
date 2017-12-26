import * as React from 'react';
import * as cls from 'classnames';
import './index.less';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
	options?: any[] | Object;
}

export class Select extends React.Component<SelectProps> {
	renderOption(props) {
		let { text, value } = props;
		if (typeof props !== 'object') {
			text = value = props;
		}

		return (
			<option value={value} key={value}>
				{text}
			</option>
		);
	}

	getSafeOptions(options){
		let type = Object.prototype.toString.call(options)
		if(type=== '[object Object]') {
			return Object.keys(options).map(value =>{
				return this.renderOption({text:options[value], value})
			})
		}else{
			return options.map(this.renderOption)
		}
	}

	render() {
		let { className, options } = this.props;
		let props: any = {};
		if (options) {
			props.children = this.getSafeOptions(options);
		}

		return <select {...this.props} {...props} className={cls('select', className)} />;
	}
}
