import { Controller, Post, HttpStatus, HttpCode, Get } from '@nestjs/common';

@Controller('admin/users')
export class UsersController {
	constructor() {}

    @Get()
    index(){
        return [{
            id:'1'
        }]
    }
}
