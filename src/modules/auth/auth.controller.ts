import { Controller, Post, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('token')
	@Post('token')
	public async getToken() {
		let user = {
			email: 'adf'
		};
		return await this.authService.createToken(user);
	}
}
