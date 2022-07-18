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

  @ApiProperty({ required: false, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @ApiProperty({ required: false, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ enum: ITEM_SORT_BY_ENUM, required: false })
  @IsOptional()
  @IsEnum(ITEM_SORT_BY_ENUM)
  sortBy?: ITEM_SORT_BY_ENUM;

  @ApiProperty({
    enum: [ITEM_ORDER_BY_ENUM[1], ITEM_ORDER_BY_ENUM[-1]],
    required: false,
  })
  @IsOptional()
  @IsEnum(ITEM_ORDER_BY_ENUM)
  order?: ITEM_ORDER_BY_ENUM;
}
