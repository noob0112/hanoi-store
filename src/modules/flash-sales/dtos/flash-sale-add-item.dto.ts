import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FlashSaleAddItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  itemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount: number;
}
