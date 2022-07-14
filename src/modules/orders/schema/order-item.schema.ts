import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  OrderItemSummary,
  OrderItemSummarySchema,
} from './order-item-summary.schema';

@Schema({ _id: false })
export class OrderItem {
  @Prop()
  quantity: number;

  @Prop({ type: OrderItemSummarySchema })
  item: OrderItemSummary;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
