import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { secretOrKey, jwtExpires } from '../../utils/config';

@Component()
export class AuthService {
	async createToken(user) {
		const token = jwt.sign(user, secretOrKey, { expiresIn: jwtExpires });
		return {
			expires_in: jwtExpires,
			access_token: token,
			name: user.username
		};
	}

	async validateUser(signedUser): Promise<boolean> {
		// put some validation logic here
		// for example query user by id / email / username
		return true;
	}
}
