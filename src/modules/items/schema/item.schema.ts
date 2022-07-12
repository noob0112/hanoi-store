import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CategorySummary,
  CategorySummarySchema,
  TimestampsMongodb,
} from 'src/common/schemas';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item extends TimestampsMongodb {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  barCode: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  weight: number;

  @Prop({ required: true })
  avataImage: string;

  @Prop()
  detailImage: [string];

  @Prop()
  description: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ default: 0 })
  historicalSold: number;

  @Prop({ required: true, type: CategorySummarySchema })
  category: CategorySummary;

  @Prop({ default: 0 })
  countOfSelling: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
