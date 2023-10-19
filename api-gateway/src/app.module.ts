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
        options: {
          urls: ['amqp://admin:admin@localhost:5672'], // Укажите URL RabbitMQ сервера
          queue: 'posts_queue', // Укажите имя очереди, с которой будет взаимодействовать микросервис
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
