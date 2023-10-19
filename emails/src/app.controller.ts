import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('test')
  getHelloEmails(@Payload() data: any, @Ctx() context: RmqContext): string {
    console.log('posts microservice data', data);
    console.log('posts microservice context', context);
    return this.appService.getHello();
  }
  // @EventPattern('test')
  // getHelloPosts(@Payload() data: any, @Ctx() context: RmqContext): string {
  //   console.log('posts microservice data', data);
  //   console.log('posts microservice context', context);
  //   return this.appService.getHello();
  // }
}
