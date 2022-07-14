import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class OrderItemSummaryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  itemId: string;
}
