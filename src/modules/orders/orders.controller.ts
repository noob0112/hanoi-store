import { Body, Controller, Post } from '@nestjs/common';
import { NewOrderDto } from './dtos';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() newOrder: NewOrderDto) {
    return this.ordersService.createOrder(newOrder);
  }
}
