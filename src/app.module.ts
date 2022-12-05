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

@Module({
  imports: [OrderModule, BookModule, UserModule],
  controllers: [AppController, OrderController, UserController],
  providers: [AppService, OrderService, UserService],
})
export class AppModule {}
