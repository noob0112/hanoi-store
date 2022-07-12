import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFlashSaleStatusDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isOnGoing: boolean;
}
