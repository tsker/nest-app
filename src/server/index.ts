import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multiparty from 'connect-multiparty';

import { port } from './utils/config';

import { ApplicationModule } from './app.module';
import { HttpCatchFilter } from './middles/http-catch.filter';

function bootstrapBackcall(...e): any {}

export async function bootstrap(cb = bootstrapBackcall) {
	const app = express();
	const { NODE_ENV = '', PORT = port } = process.env;

	app.set('views', __dirname + '/views');
	app.set('view engine', 'pug');
	app.use(express.static(path.resolve(__dirname, 'static')));

	// 映射prod版前端react目录
	const clientDistRelativePath = NODE_ENV.match('development')
		? '../../dist/client'
		: '../client';
	app.use(express.static(path.resolve(__dirname, clientDistRelativePath)));

	const nest = await NestFactory.create(ApplicationModule, app, { cors: true });
	nest.use(multiparty());
	nest.use(bodyParser.urlencoded({ extended: true }));
	nest.use(bodyParser.json());
	nest.useGlobalFilters(new HttpCatchFilter());

	await cb(app, nest);
	await nest.listen(+PORT);
	console.log('start::[env]', process.env.NODE_ENV, '[port]', PORT);
}
