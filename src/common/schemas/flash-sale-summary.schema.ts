import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { objectId } from '../types';

@Schema({ _id: false })
export class FlashSaleSummary {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'FlashSale' })
  flashSaleId: objectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;
}

export const FlashSaleSummarySchema =
  SchemaFactory.createForClass(FlashSaleSummary);
