import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { objectId } from 'src/common/types';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class ItemSummary {
  @Prop({ type: Types.ObjectId, ref: 'Item' })
  itemId: objectId;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  barCode: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  avatarImage: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  historicalSold: number;
}

export const ItemSummarySchema = SchemaFactory.createForClass(ItemSummary);
