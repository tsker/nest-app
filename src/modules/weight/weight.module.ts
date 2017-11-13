import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';

@Module({
    controllers: [WeightController],
    components: [WeightService]
})
export class WeightModule{}