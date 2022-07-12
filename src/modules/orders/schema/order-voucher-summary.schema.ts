import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { VoucherSummary } from 'src/common/schemas/voucher-summary.schema';

@Schema({ _id: false })
export class OrderVoucherSummary extends VoucherSummary {}

export const OrderVoucherSummarySchema =
  SchemaFactory.createForClass(OrderVoucherSummary);
