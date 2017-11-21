import { Controller, Get,Res, Post ,All} from '@nestjs/common';
import * as path from 'path'

@Controller('/')
export class RootController {
    @Get()
    index(@Res() res) {
        res.render('home')

    }

    @Get('*')
    notFound(@Res() res){
        let index = path.resolve(__dirname, '../../../client/index.html')
        res.sendFile(index)
    }

    @All('*')
    all(){
        return 'page'
    }
}
