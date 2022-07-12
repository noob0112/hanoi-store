import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { OrderDocument } from './schema/order.schema';

@Injectable()
export class OrdersRepository extends EntityRepository<OrderDocument> {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<OrderDocument>,
  ) {
    super(orderModel);
  }
}
