import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { CategoriesService } from '../categories/categories.service';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ItemsService } from '../items/items.service';
import { VouchersService } from '../vouchers/vouchers.service';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    readonly ordersRepository: OrdersRepository,
    readonly itemsService: ItemsService,
    readonly vouchersService: VouchersService,
    readonly flashSalesService: FlashSalesService,
    readonly categoriesService: CategoriesService,
  ) {}

  async createOrder(order) {
    const promiseVoucher = new Promise((resolve, reject) => {
      this.vouchersService
        .findVoucherByIdAndUpdateQuatity(order.voucherId)
        .then((doc) => {
          resolve(doc);
        })
        .catch((error) => {
          reject(error);
        });
    });

    const promiseListItems = order.listItems.map((item) => {
      const promiseItem = new Promise((resolve, reject) => {
        this.itemsService
          .findItemByIdAndUpdateStock(item.itemId)
          .then((doc) => {
            resolve(doc);
          })
          .catch((error) => {
            reject(error);
          });
      });

      return promiseItem;
    });

    Promise.all([...promiseListItems, promiseVoucher]).then((doc) => {
      console.log(doc);
    });
    return;
  }
}
