import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('POSTS_MICROSERVICE') private microserviceClient: ClientProxy,
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
}
