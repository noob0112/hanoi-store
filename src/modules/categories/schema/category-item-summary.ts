import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ItemSummary } from 'src/common/schemas';

@Schema({ _id: false })
export class CategoryItemSummary extends ItemSummary {}

export const CategoryItemSummarySchema =
  SchemaFactory.createForClass(CategoryItemSummary);
