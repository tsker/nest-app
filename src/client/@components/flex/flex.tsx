import { createElement , HtmlHTMLAttributes} from 'react';
import * as cls from 'classnames';
import './flex.less';

interface FlexProps extends HtmlHTMLAttributes<HTMLDivElement>{}

export function Flex({ className, ...props }:FlexProps) {
	let classname = cls('flex', className);
	return <div className={classname} {...props} />;
}
