import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [OrderModule, BookModule],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService],
})
export class AppModule {}
