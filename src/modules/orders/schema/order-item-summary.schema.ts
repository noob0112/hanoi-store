import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CategorySummary,
  CategorySummarySchema,
  FlashSaleSummary,
  FlashSaleSummarySchema,
  ItemSummary,
} from 'src/common/schemas';

@Schema({ _id: false })
export class OrderItemSummary extends ItemSummary {
  @Prop({ type: FlashSaleSummarySchema })
  flashSale: FlashSaleSummary;

  @Prop({ type: CategorySummarySchema })
  category: CategorySummary;
}

export const OrderItemSummarySchema =
  SchemaFactory.createForClass(OrderItemSummary);
