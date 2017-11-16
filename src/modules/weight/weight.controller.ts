import { HttpException } from '@nestjs/core';
import { Controller, Get, Post, HttpStatus, Res, Req, Body, UsePipes } from '@nestjs/common';
import * as moment from 'moment';

import { ValidationPipe } from '../../middles/validation.pipe';
import { WeightService, WeightModel } from './weight.service';

const li = function(item) {
	return `<li>${JSON.stringify(item)}</li>`;
};
@Controller('weight')
export class WeightController {
	constructor(private weightService: WeightService) {}

	@Get()
	async index(@Res() res) {
		let list = await this.weightService.get();
		res.render('weight', { list });
	}

	@Post()
	post(
		@Body('', new ValidationPipe())
		body: WeightModel
	) {
		let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
		return this.weightService.add({ ...body, date: currentDate });
	}
}
