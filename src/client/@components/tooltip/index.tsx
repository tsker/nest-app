import * as React from 'react';
import * as cls from 'classnames';
import { Popover, PopoverProps } from '..';
import './index.less';

interface TooltipProps extends PopoverProps {}

export function Tooltip(props: TooltipProps) {
	return <Popover {...props} className="tooltip" />;
}
