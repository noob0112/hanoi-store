import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CategorySummary,
  CategorySummarySchema,
  FlashSaleSummary,
  FlashSaleSummarySchema,
} from 'src/common/schemas';
import * as mongoose from 'mongoose';
import { objectId } from 'src/common/types';

@Schema({ _id: false })
export class OrderItemSummary {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  itemId: objectId;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  barCode: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  avatarImage: string;

  @Prop({ type: FlashSaleSummarySchema })
  flashSale: FlashSaleSummary;

  @Prop({ type: CategorySummarySchema })
  category: CategorySummary;
}

export const OrderItemSummarySchema =
  SchemaFactory.createForClass(OrderItemSummary);
