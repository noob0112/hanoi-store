import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import {
  isMoreThanDateNow,
  isMoreThanStartTime,
} from '../../../common/custom-dtos';

export class NewFlashSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @isMoreThanDateNow({ message: 'Please input startTime more than date now!' })
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @isMoreThanStartTime('startTime', {
    message: 'Please input endTime more than startTime!',
  })
  endTime: Date;
}
