export const classTpl = (fileName, componentName) => `import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import './${fileName}.less'

interface ${componentName}Props extends HtmlHTMLAttributes<HTMLDivElement> {}
interface ${componentName}State {}

export class ${componentName} extends PureComponent<${componentName}Props,${componentName}State> {
    public static defaultProps: Partial<${componentName}Props> = {};

    render() {
        return <div />;
    }
}
`


export const fnTpl = (fileName, componentName) => `import { createElement,  HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import './${fileName}.less';

interface ${componentName}Props extends HtmlHTMLAttributes<HTMLSpanElement> {
}

export function ${componentName}(props: ${componentName}Props) {
	return <div />;
}
`