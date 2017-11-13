import { ExceptionFilter, Catch, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Catch(HttpException)
export class HttpCatchFilter implements ExceptionFilter {
	catch(exception: HttpException, res: any) {
		let code = exception.getStatus();
		let error = exception.getResponse();

		res.status(code).json({
			code,
			error,
			message: HttpStatus[code]
		});
	}
}
