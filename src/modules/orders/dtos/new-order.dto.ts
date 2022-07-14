import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { OrderItemDto } from './order-item.dto';
import { OrderVoucherDto } from './order-voucher.dto';

export class NewOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  listItems: OrderItemDto[];

  @ApiProperty()
  @IsOptional()
  voucher: OrderVoucherDto;
}
