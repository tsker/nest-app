import { createElement, ReactNode } from 'react';
import { Consumer, IContext } from './context';

interface PositionReferenceProps {
	children: (x: IContext) => ReactNode;
}

export function PositionReference({ children }: PositionReferenceProps) {
	return <Consumer>{children}</Consumer>;
}
