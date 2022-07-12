import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { objectId } from 'src/common/types';

@Schema({ _id: false })
export class OrderUserSummary {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: objectId;

  @Prop()
  phoneNumber: string;

  @Prop()
  fullName: string;

  @Prop()
  address: string;
}

export const OrderUserSummarySchema =
  SchemaFactory.createForClass(OrderUserSummary);
