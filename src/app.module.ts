import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const { combine, timestamp, printf, errors, json } = winston.format;
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});
@Module({
  imports: [
    OrderModule,
    BookModule,
    UserModule,
    AuthModule,
    WinstonModule.forRoot({
      // format: winston.format.combine(
      //   winston.format.simple(),
      //   errors({ stack: true }),
      //   winston.format.timestamp({
      //     format: 'YYYY-MM-DD HH:mm:ss',
      //   }),
      //   // winston.format.simple(),
      //   // winston.format.colorize(),
      // ),
      format: combine(
        winston.format.colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
      ),
      transports: [
        new winston.transports.Console({
          // format: winston.format.combine(
          //   winston.format.timestamp(),
          //   winston.format.ms(),
          //   winston.format.cli(),
          // ),
        }),
        new winston.transports.File({
          filename: 'combined.log',
          format: combine(timestamp(), json(), winston.format.prettyPrint()),
        }),
        new winston.transports.File({
          filename: 'app-error.log',
          level: 'error',
          format: combine(
            timestamp(),
            json(),
            winston.format.prettyPrint(),
            errors(),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController, OrderController, UserController],
  providers: [AppService, OrderService, UserService],
})
export class AppModule {}
