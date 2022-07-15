import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CategorySummary,
  CategorySummarySchema,
  ItemSummary,
} from 'src/common/schemas';

@Schema({ _id: false })
export class FlashSaleItemSummary extends ItemSummary {
  @Prop({ type: CategorySummarySchema })
  category: CategorySummary;
}

export const FlashSaleItemSummarySchema =
  SchemaFactory.createForClass(FlashSaleItemSummary);
