import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multiparty from 'connect-multiparty';
import * as csshook from 'css-modules-require-hook'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './apollo-schema';

import { port } from './utils/config';

import { ApplicationModule } from './app.module';
import { HttpCatchFilter } from './middles/http-catch.filter';

csshook({
    generateScopedName: '[name]__[local]',
    extensions: ['.css', '.less', '.scss'],
    // processorOpts: {parser: lessParser.parse},
  });

function bootstrapBackcall(...e): any {}

export async function bootstrap(cb = bootstrapBackcall) {
	const app = express();
	const { NODE_ENV = '', PORT = port } = process.env;

	app.set('views', __dirname + '/views');
	app.set('view engine', 'pug');
	app.use(express.static(path.resolve(__dirname, 'static')));
	app.use('/gql', bodyParser.json(), graphqlExpress({ schema }));
	app.use('/gql-query', graphiqlExpress({ endpointURL: '/gql' }));

	// 映射prod版前端react目录
	// const clientDistRelativePath = NODE_ENV.match('development')
	// 	? '../../dist/client'
	// 	: '../client';
	app.use(express.static(path.resolve(__dirname, '../../dist/client')));
	app.use(express.static(path.resolve(__dirname, '../client')));

	const nest = await NestFactory.create(ApplicationModule, app, { cors: true });
	nest.use(multiparty());
	nest.use(bodyParser.urlencoded({ extended: true }));
	nest.use(bodyParser.json());
	nest.useGlobalFilters(new HttpCatchFilter());

	await cb(app, nest);
	await nest.listen(+PORT);
	console.log('start::[env]', process.env.NODE_ENV, '[port]', PORT);
}
