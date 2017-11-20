import { HttpException } from '@nestjs/core';
import { Controller, Get, Post, HttpStatus, Res, Req, Param, Body, UsePipes } from '@nestjs/common';
import * as moment from 'moment';

import { ValidationPipe } from '../../middles/validation.pipe';
import { WeightService, WeightModel } from './weight.service';

@Controller('weight')
export class WeightController {
	constructor(private weightService: WeightService) {}

	@Get(':month?')
	async index(@Res() res, @Param() param) {
		let list = await this.weightService.get(param);
		res.render('weight', { list });
	}

	@Post()
	post(
		@Body('', new ValidationPipe())
		body: WeightModel
	) {
		return this.weightService.add(body);
	}
}
