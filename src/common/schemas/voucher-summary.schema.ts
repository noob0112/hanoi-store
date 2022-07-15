import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { objectId } from '../types';

@Schema({ _id: false })
export class VoucherSummary {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Voucher' })
  voucherId: objectId;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  discount: number;
}

export const VoucherSummarySchema =
  SchemaFactory.createForClass(VoucherSummary);
