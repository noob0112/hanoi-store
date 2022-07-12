import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { TimestampsMongodb } from 'src/common/schemas';
import { ORDER_STATUS_ENUM } from '../orders.constant';
import {
  OrderItemSummary,
  OrderItemSummarySchema,
} from './order-item-summary.schema';
import {
  OrderUserSummary,
  OrderUserSummarySchema,
} from './order-user-summary.schema';
import {
  OrderVoucherSummary,
  OrderVoucherSummarySchema,
} from './order-voucher-summary.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order extends TimestampsMongodb {
  @Prop({ required: true, type: OrderUserSummarySchema })
  user: OrderUserSummary;

  @Prop({ require: true, type: [OrderItemSummarySchema] })
  listItems: OrderItemSummary[];

  @Prop({ type: [OrderVoucherSummarySchema] })
  voucher: OrderVoucherSummary;

  @Prop({ required: true })
  orginPrice: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ enum: ORDER_STATUS_ENUM, default: ORDER_STATUS_ENUM.CREATED })
  status: ORDER_STATUS_ENUM;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
