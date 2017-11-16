import { Controller, Post, HttpStatus, HttpCode, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('token')
	@Post('token')
	public async getToken(@Headers() head) {
		let email = head['auth-user-email'] || ''
		if( email.trim() !== '477800969@qq.com'){
			return '401: 没有权限'
		}else{
			return await this.authService.createToken({email});
		}
	}
}
