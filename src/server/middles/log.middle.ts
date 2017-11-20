import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as  moment from "moment";
@Middleware()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): ExpressMiddleware {
        return (req, res, next) => {
            let url = req.baseUrl + req.url
            let message = `${req.method} ${url} ${moment().format()}`
            console.log('Req Middle::', message);
            next();
        };
    }
}
