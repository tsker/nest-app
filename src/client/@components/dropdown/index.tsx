import * as React from 'react';
import * as cls from 'classnames';
import { Popover, PopoverProps } from '..';
import './index.less';
import { eachBind } from '@components/util';

interface DropdownProps extends PopoverProps {
	target?: React.ReactElement<any>;
	children:any
}

export class Dropdown extends React.Component<DropdownProps, any> {
	constructor(p){
		super(p)
		eachBind(['hide'], this)
	}

	hide(){
		this.refs.popover['handleHide']()
	}

	transformChildren(children) {
		let childs = React.Children.toArray(children).map((child, index) => {
			return (
				<li className="dropdown-list-item" onClick={this.hide}>
					{child}
				</li>
			);
		});
		return <ul className="dropdown-list">{childs}</ul>;
	}

	render() {
		let { className, children, target, ...props } = this.props;
		let prefix ='dropdown'
		return (
			<Popover
				{...props}
				ref="popover"
				prefix={prefix}
				className={cls(prefix, className)}
				arrowVisible={false}
				content={this.transformChildren(children)}
			>
				{target as React.ReactElement<any>}
			</Popover>
		);
	}
}
