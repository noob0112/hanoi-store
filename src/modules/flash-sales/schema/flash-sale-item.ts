import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  FlashSaleItemSummary,
  FlashSaleItemSummarySchema,
} from './flash-sale-item-summary';

@Schema({ _id: false })
export class FlashSaleItem {
  @Prop({ type: FlashSaleItemSummarySchema })
  item: FlashSaleItemSummary;

  @Prop()
  priceBeforeDiscount: number;

  @Prop()
  stockFlashSale: number;
}

export const FlashSaleItemSchema = SchemaFactory.createForClass(FlashSaleItem);
