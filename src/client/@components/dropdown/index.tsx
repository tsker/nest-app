import * as React from 'react';
import * as cls from 'classnames';
import { Popover, PopoverProps } from '..';
import './index.less';

interface DropdownProps {
	className?: any;
	options?: any[] | Object;
	content?: React.ReactNode;
	trigger?: PopoverProps['trigger'];
	placement?: PopoverProps['placement'];
}

export class Dropdown extends React.Component<DropdownProps, any> {
	render() {
		let { className, children, trigger, content, placement } = this.props;
		return (
			<Popover
				className={cls('dropdown', className)}
				placement={placement}
				trigger={trigger}
				arrowVisible={false}
				content={content}
			>
				{children as React.ReactElement<any>}
			</Popover>
		);
	}
}
