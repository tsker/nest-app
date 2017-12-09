import { Controller, Get, Res, Post, All } from '@nestjs/common';
import * as path from 'path';

@Controller('/')
export class RootController {
	@Get()
	index(@Res() res) {
		res.render('home');
	}

	@Get('*')
	notFound(@Res() res) {
		res.render('not-found');
    }

}
