import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World from EMAILS_MICROSERVICE!';
  }

  async sendEmail(email: string): Promise<any> {
    console.log('we send email to addres:', email);
    return this.mailerService
      .sendMail({
        to: email,
        from: 'chernetskeyivan@gmail.com',
        subject: 'Info about Payment',
        text: "You've successfully bought a vinyl record.\n",
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
              h1 {
                  color: blue;
              }
          </style>
      </head>
      <body>
          <h1>Info about vinyl record:</h1>
          <div><b>Name: ${'nameTest'}</b></div>
          <div><b>Author: ${'authorTest'}</b></div>
          <div><b>Description: ${'descriptionTest'}</b></div>
          <div><b>Image: ${'imageTest'}</b></div>
          <div><b>Price: ${'priceTest'}$</b></div>
      </body>
      </html>`,
      })
      .then((res) => {
        console.log('res: ', res);
        console.log('Success mail');
        return res;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
