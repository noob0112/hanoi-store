import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { QUERY_ORDER_BY_ENUM } from '../constants';

export class QueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({
    enum: [QUERY_ORDER_BY_ENUM[1], QUERY_ORDER_BY_ENUM[-1]],
    required: false,
  })
  @IsOptional()
  @IsEnum(QUERY_ORDER_BY_ENUM)
  order?: QUERY_ORDER_BY_ENUM;
}
