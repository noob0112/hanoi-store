import { ApiProperty } from '@nestjs/swagger';
import { ItemCategory } from '../../../modules/items/dtos';
import { ItemSummaryDto } from '../../../common/dtos/item-summary.dto';

class FlashSaleItemSummary extends ItemSummaryDto {
  @ApiProperty()
  stock: number;
  @ApiProperty()
  historicalSold: number;
  @ApiProperty({ type: ItemCategory })
  category: ItemCategory;
}

class FlashSaleItem {
  @ApiProperty({ type: FlashSaleItemSummary })
  item: FlashSaleItemSummary;

  @ApiProperty()
  priceBeforeDiscount: number;

  @ApiProperty()
  stockFlashSale: number;
}

export class FlashSaleResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  isOnGoing: boolean;

  @ApiProperty({ type: [FlashSaleItem] })
  listItems?: FlashSaleItem[];
}
