import {
    Controller,
    Post,
    HttpStatus,
    Res,
    HttpCode,
    Get,
    Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpException } from '@nestjs/core/exceptions/http-exception';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('token')
    public async createToken(@Body() body) {
        if (body.username === 'luofei' && body.password === '123456') {
            return await this.authService.createToken(body);
        } else {
            throw new HttpException(
                { msg: HttpStatus['401'] },
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    @Get('login')
    public async login(@Res() res) {
        res.render('auth/login');
    }
}
