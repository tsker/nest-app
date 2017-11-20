import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';

import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { weightProvider } from './weight.provider';

@Module({
	modules:[DatabaseModule],
	controllers: [ WeightController ],
	components: [ WeightService,weightProvider ]
})
export class WeightModule {}
