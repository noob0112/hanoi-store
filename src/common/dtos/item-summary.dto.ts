import { ApiProperty } from '@nestjs/swagger';

export class ItemSummaryDto {
  @ApiProperty()
  itemId: string;

  @ApiProperty()
  itemName: string;

  @ApiProperty()
  barCode: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  avatarImage: string;
}
