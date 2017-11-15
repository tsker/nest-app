import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multiparty from 'connect-multiparty';

import { port, datebase } from './utils/config';

import { ApplicationModule } from './app.module';
import { HttpCatchFilter } from './middles/http-catch.filter';

async function bootstrap() {
	const app = express();
	const nest = await NestFactory.create(ApplicationModule, app);

	nest.use(multiparty());
	nest.use(bodyParser.urlencoded({ extended: true }));
	nest.use(bodyParser.json());

	nest.useGlobalFilters(new HttpCatchFilter());

	await nest.listen(port);
}

bootstrap();
