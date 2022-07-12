import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class NewFlashSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}
