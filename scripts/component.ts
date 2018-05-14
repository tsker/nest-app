import * as fs from 'fs';
import * as path from 'path';
import * as tpls from './component-tpl';

let argv: string[] = process.argv.slice();
let nameArr        = argv[2].toLowerCase().split('/');
let name           = nameArr[nameArr.length-1]
let componentName  = name.replace(/^./, (s) => s.toUpperCase());
let componentPath  = path.resolve(__dirname, '../src/client/@components', nameArr[0]);

main();

function notExist(p) {
	return !fs.existsSync(p);
}

function create(file, tpl) {
	file = path.resolve(componentPath, file);
	if (notExist(file)) {
		fs.writeFileSync(file, tpl, 'utf-8');
	}
}

function main() {
	if (notExist(componentPath)) {
		fs.mkdirSync(componentPath);
	}

	let tpl = argv.indexOf('--fn') > -1 ? tpls.fnTpl : tpls.classTpl;

	create('index.ts', `export * from './${name}'`);
	create(`${name}.less`, ``);
	create(`${name}.tsx`, tpl(name, componentName));
}
