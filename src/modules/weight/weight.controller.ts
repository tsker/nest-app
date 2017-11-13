import { HttpException } from '@nestjs/core';
import { Controller, Get, Post, HttpStatus, Req, Body, UsePipes } from '@nestjs/common';
import * as moment  from "moment";

import { ValidationPipe } from '../../middles/validation.pipe';
import { WeightService, WeightModel } from './weight.service';


const li = function(item) {
	return `<li>${JSON.stringify(item)}</li>`;
};
@Controller('weight')
export class WeightController {
	constructor(private weightService: WeightService) {}

	@Get()
	async index() {
		let data = await this.weightService.get();
		return `
			<ul id='ul'>${data.map(li)}</ul>
			<input id='input' />
			<button onClick="add()">添加</button>
			<script>
			const li = function(item) {
				return \`<li>\${JSON.stringify(item)}</li>\`;
			};
			function add(){
				let input = document.getElementById('input')
				let ul = document.getElementById('ul')
				let value = input.value
				fetch('/weight', {
					method:'post',
					headers:{
						'content-type':'application/json'
					},
					body: JSON.stringify({value})
				}).then(e=> e.json()).then(function(data){
					ul.innerHTML = data.map(li)
					input.value = ''
				})
			}
			</script>
		`;
	}

	@Post()
	post(@Body() body) {
		return this.weightService.add({
			...body,
			date: moment().format('YYYY-MM-DD HH:mm:ss')
		})
	}
}
