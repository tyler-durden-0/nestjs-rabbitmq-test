import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('POSTS_MICROSERVICE') private microserviceClient: ClientProxy,
    @Inject('EMAILS_MICROSERVICE')
    private emailsMicroserviceClient: ClientProxy,
  ) {
    this.microserviceClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'posts_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
    this.emailsMicroserviceClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'emails_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('posts-microservice')
  async getHelloFromPostsMicroservice(): Promise<Observable<string>> {
    // return this.microserviceClient.emit<string, any>('test', 'getHelloPosts');
    const response = this.microserviceClient.send<string, any>(
      'test',
      'getHelloPosts',
    );
    console.log('response', response);
    return response;
  }

  @Get('emails-microservice')
  async getHelloFromEmailsMicroservice(): Promise<string> {
    const response = await lastValueFrom(
      this.emailsMicroserviceClient.send<string, any>('test', 'getHelloPosts'),
    );
    return response;
  }

  @Get('send-email')
  async sendEmail(): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.emailsMicroserviceClient.send<any>(
          { cmd: 'send_email' },
          {
            email: 'ivanchernetskey@mail.ru',
            // email: 'chernetskeyivan@gmail.com',
            // email: 'kiryl.kavalenka@innowise-group.com',
          },
        ),
      );
      return result;
    } catch (error) {
      console.log('error');
      throw error;
    }
  }
}
