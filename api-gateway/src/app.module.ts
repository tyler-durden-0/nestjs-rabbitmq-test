import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTS_MICROSERVICE', // Укажите имя вашего микросервиса
        transport: Transport.RMQ, // Используйте тот же тип транспорта, что и в микросервисе
      },
      {
        name: 'EMAILS_MICROSERVICE', // Укажите имя вашего микросервиса
        transport: Transport.RMQ, // Используйте тот же тип транспорта, что и в микросервисе
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
