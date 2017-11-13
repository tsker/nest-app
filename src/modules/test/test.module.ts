import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
    controllers: [TestController],
    components: [TestService]
})
export class TestModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {

    }
}
