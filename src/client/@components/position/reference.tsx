import { createElement, ReactNode } from 'react';
import { Consumer, IContent } from './context';

interface PositionReferenceProps {
	children: (x: IContent) => ReactNode;
}

export function PositionReference({ children }: PositionReferenceProps) {
	return <Consumer>{children}</Consumer>;
}
