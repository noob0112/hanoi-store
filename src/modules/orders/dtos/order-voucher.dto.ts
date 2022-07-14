import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class OrderVoucherDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  @IsString()
  voucherId: string;
}
