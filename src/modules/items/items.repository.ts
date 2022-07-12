import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { IQueryItem } from './entities';
import { ITEM_OPTIONS_ENUM, ITEM_ORDER_BY_ENUM } from './items.constant';
import { ItemDocument } from './schema/item.schema';

@Injectable()
export class ItemsRepository extends EntityRepository<ItemDocument> {
  userViewer = {
    cost: 0,
    countOfSelling: 0,
  };

  constructor(
    @InjectModel('Item')
    private readonly itemModel: Model<ItemDocument>,
  ) {
    super(itemModel);
  }

  async findListItem(query: IQueryItem): Promise<ItemDocument[]> {
    const filterQuery = {};
    const sort = {};

    filterQuery['price'] = {
      $gte: query.minPrice | 0,
    };

    if (query.maxPrice) filterQuery['price']['$lte'] = query.maxPrice;

    sort[query.sortBy] = ITEM_ORDER_BY_ENUM[query.order] | 1;

    const options = {
      limit: ITEM_OPTIONS_ENUM.LIMIT,
      sort,
      skip: ITEM_OPTIONS_ENUM.LIMIT * ((+query.page - 1) | 0),
    };
    return await this.itemModel.find(filterQuery, this.userViewer, options);
  }

  async findItemById(itemId) {
    return await this.itemModel.findById(itemId, this.userViewer);
  }
}
