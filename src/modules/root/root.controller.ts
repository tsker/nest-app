import { Controller, Get, Post } from '@nestjs/common';

@Controller('/')
export class RootController {
    @Get()
    index() {
        return '<h1>Home</h1>'
    }
}
