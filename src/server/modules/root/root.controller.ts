import { Controller, Get,Res, Post ,All} from '@nestjs/common';

@Controller('/')
export class RootController {
    @Get()
    index(@Res() res) {
        res.render('home')

    }

    @Get('*')
    notFound(@Res() res){
        res.render('not-found')
    }

    @All('*')
    all(){
        return 'page'
    }
}
