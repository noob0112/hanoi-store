import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ObjectIdDto } from '../../common/dtos';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { VerifyGuard } from '../auth/guards/verify.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { NewOrderDto } from './dtos';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(readonly ordersService: OrdersService) {}

  @UseGuards(JwtGuard, VerifyGuard, RolesGuard)
  @Roles(ROLE_ENUM.USER)
  @Post()
  createOrder(@Req() req, @Body() newOrder: NewOrderDto) {
    return this.ordersService.createOrder(newOrder, req.user._id);
  }

  @Put(':id')
  findOrderByIdAndUpdateStatus(
    @Param() param: ObjectIdDto,
    @Body() updateOrderStatus: UpdateOrderStatusDto,
  ) {
    return this.ordersService.findOrderByIdAndUpdateStatus(
      param.id,
      updateOrderStatus,
    );
  }
}
