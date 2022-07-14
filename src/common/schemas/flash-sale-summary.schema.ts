import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { objectId } from '../types';

@Schema({ _id: false })
export class FlashSaleSummary {
  @Prop({ type: Types.ObjectId, ref: 'FlashSale' })
  flashSaleId: objectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  priceBeforeDiscount: number;
}

export const FlashSaleSummarySchema =
  SchemaFactory.createForClass(FlashSaleSummary);
