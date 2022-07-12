import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { isMoreThanDateNow, isMoreThanStartTime } from 'src/common/custom-dtos';

export class NewVoucherDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @isMoreThanDateNow({
    message: 'Please input startTime more than date now!',
  })
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @isMoreThanStartTime('startTime', {
    message: 'Please input endTime more than startTime!',
  })
  endTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quatity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
