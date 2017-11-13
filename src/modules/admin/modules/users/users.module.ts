import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';

import { UsersController } from './users.controller';

@Module({
	controllers: [ UsersController ]
})
export class UsersModule {}
