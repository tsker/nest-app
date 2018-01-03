import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as moment from 'moment';

function msg(req, res) {
	let url = req.baseUrl + req.url;
	return `${res.statusCode} ${req.method} ${url} ${moment().format()}`;
}
@Middleware()
export class LoggerMiddleware implements NestMiddleware {
	resolve(...args: any[]): ExpressMiddleware {
		return async (req, res, next) => {
			// console.log('Req log::', msg(req, res));
			await next();
			console.log('Res log::', msg(req, res));
		};
	}
}
