import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('test')
  getHelloEmails(@Payload() data: any, @Ctx() context: RmqContext): string {
    console.log('posts microservice data', data);
    console.log('posts microservice context', context);
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'send_email' })
  async sendEmail(@Payload() data: any): Promise<any> {
    return this.appService.sendEmail(data.email);
  }
}
