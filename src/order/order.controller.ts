import { Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrderForm(): Observable<string> {
    return this.orderService.getOrderForm();
  }
}
