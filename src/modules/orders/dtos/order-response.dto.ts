import { ApiProperty } from '@nestjs/swagger';
import { ItemSummaryDto } from '../../../common/dtos/item-summary.dto';
import { ItemCategory } from '../../../modules/items/dtos';
import { ORDER_STATUS_ENUM } from '../orders.constant';

class OrderVoucher {
  @ApiProperty()
  voucherId: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  discount: number;
}

class FlashSaleSummary {
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

class OrderUser {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  address: string;
}

class OrderItemSummary extends ItemSummaryDto {
  @ApiProperty()
  flashSale?: FlashSaleSummary;

  @ApiProperty()
  category?: ItemCategory;
}

class OrderItem {
  @ApiProperty({ type: OrderItemSummary })
  item: OrderItemSummary;

  @ApiProperty()
  quantity: number;
}

export class OrderResponse {
  @ApiProperty()
  _id?: string;

  @ApiProperty({ type: OrderUser })
  user: OrderUser;

  @ApiProperty({ type: [OrderItem] })
  listItems: OrderItem[];

  @ApiProperty({ type: OrderVoucher })
  voucher?: OrderVoucher;

  @ApiProperty()
  originPrice: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  status?: ORDER_STATUS_ENUM;
}
