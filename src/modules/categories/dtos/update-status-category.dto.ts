import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { STATUS_CATEGORY_ENUM } from '../categories.constant';

export class StatusCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(STATUS_CATEGORY_ENUM)
  status: STATUS_CATEGORY_ENUM;
}
