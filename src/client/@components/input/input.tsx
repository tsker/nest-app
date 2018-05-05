import { createElement } from 'react';
import { enhancedClassname } from '../util';

export function Input(props) {
	let cls = enhancedClassname('input', { prefix: true, props, attrs: [ 'size', 'disabled' ] });
	return <input type="text" className={cls} />;
}
