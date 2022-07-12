import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimestampsMongodb } from 'src/common/schemas/time-stamps.schema';

export type VoucherDocument = Voucher & Document;

@Schema({ timestamps: true })
export class Voucher extends TimestampsMongodb {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({})
  description: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: false })
  discount: number;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
