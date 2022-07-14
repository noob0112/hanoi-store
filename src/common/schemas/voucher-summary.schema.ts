import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { objectId } from '../types';

@Schema({ _id: false })
export class VoucherSummary {
  @Prop({ type: Types.ObjectId, ref: 'Voucher' })
  voucherId: objectId;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  discount: number;
}

export const VoucherSummarySchema =
  SchemaFactory.createForClass(VoucherSummary);
