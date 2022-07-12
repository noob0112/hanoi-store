import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../../database/entity.repository';
import { FlashSaleDocument } from './schema';

@Injectable()
export class FlashSalesRepository extends EntityRepository<FlashSaleDocument> {
  constructor(
    @InjectModel('FlashSale')
    private readonly flashSaleModel: Model<FlashSaleDocument>,
  ) {
    super(flashSaleModel);
  }
}
