import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimestampsMongodb } from 'src/common/schemas';
import {
  FlashSaleItemSummary,
  FlashSaleItemSummarySchema,
} from './flash-sale-item-summary';

export type FlashSaleDocument = FlashSale & Document;

@Schema({ timestamps: true })
export class FlashSale extends TimestampsMongodb {
  @Prop({ required: true })
  name: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ default: false })
  isOnGoing: boolean;

  @Prop({ type: [FlashSaleItemSummarySchema], default: [] })
  listItems: FlashSaleItemSummary[];
}

export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);
