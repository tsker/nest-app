import * as React from 'react';
import * as cls from 'classnames';
import { Popover, PopoverProps } from '..';
import './index.less';

interface TooltipProps extends PopoverProps {
    content: string
}

export function Tooltip({ className, ...props }: TooltipProps) {
    return <Popover {...props} className={cls('tooltip', className)} />;
}
