import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ORDER_STATUS_ENUM } from '../orders.constant';

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsEnum(ORDER_STATUS_ENUM)
  status: ORDER_STATUS_ENUM;
}
