import { Controller, Get, Post ,All} from '@nestjs/common';

@Controller('/')
export class RootController {
    @Get()
    index() {
        return '<h1>Home</h1>'
    }

    @Get('*')
    notFound(){
        return 'not page'
    }

    @All('*')
    all(){
        return 'page'
    }
}
