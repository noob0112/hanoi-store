import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { objectId } from 'src/common/types';

@Schema({ _id: false })
export class CategorySummary {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: objectId;

  @Prop({ required: true })
  categoryName: string;
}

export const CategorySummarySchema =
  SchemaFactory.createForClass(CategorySummary);
