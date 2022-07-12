import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class NewOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  listItems: OrderItemDto[];

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  @IsString()
  voucherId: string;
}
