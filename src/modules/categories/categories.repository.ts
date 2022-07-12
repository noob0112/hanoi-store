import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../../database/entity.repository';
import { CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategorysRepository extends EntityRepository<CategoryDocument> {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }

  async findByIdAndAddItem(id: string, itemSummary) {
    return await this.categoryModel.findByIdAndUpdate(
      id,
      {
        $push: { listItems: itemSummary },
      },
      { new: true },
    );
  }
}
