import { ApiProperty } from '@nestjs/swagger';
import { STATUS_CATEGORY_ENUM } from '../categories.constant';

class CategoryItemFlashSale {
  @ApiProperty()
  flashSaleId: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  priceBeforeDiscount: number;

  @ApiProperty()
  stockFlashSale?: number;
}

class CategoryItem {
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

  @ApiProperty()
  stock: number;

  @ApiProperty()
  historicalSold: number;

  @ApiProperty({ type: CategoryItemFlashSale })
  flashSale?: CategoryItemFlashSale;
}

export class CategoryResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: STATUS_CATEGORY_ENUM })
  status: STATUS_CATEGORY_ENUM;

  @ApiProperty()
  banner: string;

  @ApiProperty()
  field: number;

  @ApiProperty({ type: [CategoryItem] })
  listItems: [CategoryItem];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
