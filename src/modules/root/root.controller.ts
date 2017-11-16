import { Controller, Get,Res, Post ,All} from '@nestjs/common';

@Controller('/')
export class RootController {
    @Get()
    index(@Res() res) {
        res.render('home')

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
