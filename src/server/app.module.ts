import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';

import { RootModule } from './modules/root/root.module';
import { AuthModule } from './modules/auth/auth.module';
import { WeightModule } from './modules/weight/weight.module';

import { AdminModule } from './modules/admin/admin.module';

import { LoggerMiddleware } from './middles/log.middle';

@Module({
	modules: [ AuthModule, AdminModule, WeightModule, RootModule ]
})
export class ApplicationModule implements NestModule {
	configure(consumer: MiddlewaresConsumer): void {
		consumer.apply([ LoggerMiddleware ]).forRoutes({
			path: '*',
			method: RequestMethod.ALL
		});
	}
}
