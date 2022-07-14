import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { OrderItemSummaryDto } from './order-item-summary.dto';

export class OrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  item: OrderItemSummaryDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
