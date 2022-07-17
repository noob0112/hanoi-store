import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { QUERY_ORDER_BY_ENUM } from '../constants';

export class QueryDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(QUERY_ORDER_BY_ENUM)
  order?: QUERY_ORDER_BY_ENUM;
}
