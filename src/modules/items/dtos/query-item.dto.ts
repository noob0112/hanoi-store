import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ITEM_ORDER_BY_ENUM, ITEM_SORT_BY_ENUM } from '../items.constant';

export class QueryItemDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ITEM_SORT_BY_ENUM)
  sortBy?: ITEM_SORT_BY_ENUM;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ITEM_ORDER_BY_ENUM)
  order?: ITEM_ORDER_BY_ENUM;
}
