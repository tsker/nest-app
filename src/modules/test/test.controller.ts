import { HttpException } from '@nestjs/core';
import {
	Controller,
	Get,
	Post,
	HttpStatus,
	Req,
	Param,
	Body,
	Query,
	UsePipes
} from '@nestjs/common';

import { ValidationPipe } from '../../middles/validation.pipe';
import { TestService, TestModel } from './test.service';

@Controller('test')
export class TestController {
	constructor(private testService: TestService) {}

	@Get()
	index(@Req() req, @Param() param) {
		return `<script>function a(){
            fetch('/test/post?b=2', {method:'post', body:'c=a&a[c]=2&a[d][e][2]=2',headers:{
                'content-type':'application/x-www-form-urlencoded'
            }})
            fetch('/test/post?b=2', {method:'post', body:JSON.stringify({a:{c:{d:{e:{ff:{ee:{a:'asdf'}}}}}}}),headers:{
                'content-type':'application/json'
            }})
        }
        function b(){
            let form  = new FormData()
            form.append('a',1);
            form.append('b','adsf');
            fetch('/test/post?b=2', {method:'post', body:form})
        }

            </script>
        <h1 onclick="a()">a</h1>
        <h1 onclick="b()">b</h1>
        <form id='dd'>
        <input type='file' name='f' />
        <input name='t'/><button>submit</button></form>
        <script>
        document.getElementById('dd').onsubmit  = function (e){
            e.preventDefault()
            let form = new FormData(e.target)
            fetch('/test/post?b=2', {method:'post', body:form})
        }
        </script>
        `;
	}

	@Post('post')
	post(@Req() req, @Param() param, @Body() body, @Query() query) {
		console.log(param, body, query, req.files);
		return 'test';
	}

	@Get('list')
	list() {
		return this.testService.get();
	}

	@Get('add')
	async add(
		@Query('', new ValidationPipe())
		testModel: TestModel
	) {
		await this.testService.add(testModel);
		return testModel
	}
}
