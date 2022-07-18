import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
} from '../../swagger/error-exception';
import { ObjectIdDto } from '../../common/dtos';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { VerifyGuard } from '../auth/guards/verify.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { NewOrderDto } from './dtos';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { OrdersService } from './orders.service';
import { OrderResponse } from './dtos/order-response.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(readonly ordersService: OrdersService) {}

  // Create Order
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Create Order' })
  @ApiCreatedResponse({
    description: 'Create order successfully.',
    type: OrderResponse,
  })
  @ApiBadRequestResponse({
    description: 'create order error!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiInternalServerErrorResponse({
    description: 'create order error!',
    type: InternalServerErrorResponse,
  })
  @UseGuards(JwtGuard, VerifyGuard, RolesGuard)
  @Roles(ROLE_ENUM.USER, ROLE_ENUM.ADMIN)
  @Post()
  createOrder(@Req() req, @Body() newOrder: NewOrderDto) {
    return this.ordersService.createOrder(newOrder, req.user._id);
  }

  // Update status order
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Update status order' })
  @ApiOkResponse({
    description: 'Update order successfully.',
    type: OrderResponse,
  })
  @ApiBadRequestResponse({
    description: 'update order error!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiInternalServerErrorResponse({
    description: 'update order error!',
    type: InternalServerErrorResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
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
