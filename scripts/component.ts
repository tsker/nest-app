import * as fs from 'fs'
let path = require('path');
let comName = process.argv[2]
let componentName = comName.replace(/^./, s =>s.toUpperCase())
let componentPath = path.resolve(__dirname, '../src/client/@components', comName)

var comtpl = `import { createElement, PureComponent, HtmlHTMLAttributes } from 'react';
import * as cls from 'classnames';

import './${comName}.less'

interface ${componentName}Props extends HtmlHTMLAttributes<HTMLDivElement> {}
interface ${componentName}State {}

export class ${componentName} extends PureComponent<${componentName}Props,${componentName}State> {
    public static defaultProps: Partial<${componentName}Props> = {};

    render() {
        return <div />;
    }
}
`


function notExist(p){
    return !fs.existsSync(p)
}

function create(file, tpl){
    file = path.resolve(componentPath, file)
    if(notExist(file)){
        fs.writeFileSync(file, tpl, 'utf-8')
    }
}

function main(){
    if(notExist(componentPath)){
        fs.mkdirSync(componentPath)
    }

    create('index.ts'       ,   `export * from './${comName}'`   )
    create(`${comName}.less`,   ``                               )
    create(`${comName}.tsx` ,   comtpl                           )
}

main()