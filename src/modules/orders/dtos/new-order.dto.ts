import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class NewOrderDto {
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  listItems: OrderItemDto[];

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  @IsString()
  voucherId?: string;
}

class OrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  itemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;
}
