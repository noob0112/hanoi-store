import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { IItem } from '../items/entities';
import { ITEM_ORDER_BY_ENUM } from '../items/items.constant';
import { ItemsService } from '../items/items.service';
import { IUser } from '../users/entities';
import { UsersService } from '../users/users.service';
import { IVoucher } from '../vouchers/entities';
import { VouchersService } from '../vouchers/vouchers.service';
import { IOrder } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    readonly ordersRepository: OrdersRepository,
    readonly itemsService: ItemsService,
    readonly vouchersService: VouchersService,
    readonly flashSalesService: FlashSalesService,
    readonly categoriesService: CategoriesService,
    readonly usersService: UsersService,
  ) {}

  async createOrder(newOrder: IOrder, userId: string) {
    const task = [];
    const promiseUser = new Promise((resolve, reject) => {
      this.usersService
        .findUserById(userId)
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });

    task.push(promiseUser);

    if (newOrder.voucher && newOrder.voucher.voucherId) {
      const promiseVoucher = new Promise((resolve, reject) => {
        this.vouchersService
          .findVoucherByIdAndUpdateQuatity(newOrder.voucher.voucherId)
          .then((doc) => {
            resolve(doc);
          })
          .catch((error) => {
            reject(error);
          });
      });

      task.push(promiseVoucher);
    }

    newOrder.listItems.forEach((itemDetail) => {
      task.push(
        new Promise((resolve, reject) => {
          this.itemsService
            .findItemByIdAndUpdateStock(
              String(itemDetail.item.itemId),
              itemDetail.quantity,
            )
            .then((doc) => {
              resolve({ item: doc, quantity: itemDetail.quantity });
            })
            .catch((error) => {
              reject(error);
            });
        }),
      );
    });

    // HAVE VOUCHER => task[user, voucher, ...listItems]
    if (newOrder.voucher) {
      const [user, voucher, ...listItems] = await Promise.all(task).then(
        (docs) => {
          return docs;
        },
      );

      newOrder.listItems = listItems.map(({ item, quantity }) => {
        return { item: this.getOrderItemSummary(item), quantity };
      });

      newOrder.voucher = this.getOrdrVoucher(voucher);

      newOrder.user = this.getOrderUser(user);

      newOrder.originPrice = newOrder.listItems.reduce((total, itemDetail) => {
        if (itemDetail.item.flashSale)
          return (total +=
            itemDetail.item.flashSale.priceBeforeDiscount *
            itemDetail.quantity);
        return (total += itemDetail.item.price * itemDetail.quantity);
      }, 0);

      if (newOrder.originPrice - newOrder.voucher.discount <= 0)
        newOrder.totalPrice = 0;

      if (newOrder.originPrice - newOrder.voucher.discount > 0)
        newOrder.totalPrice = newOrder.originPrice - newOrder.voucher.discount;
    }

    // NOT HAVE VOUCHER => task[user, ...listItems]
    if (!newOrder.voucher) {
      const [user, ...listItems] = await Promise.all(task).then((docs) => {
        return docs;
      });

      newOrder.listItems = listItems.map(({ item, quantity }) => {
        return { item: this.getOrderItemSummary(item), quantity };
      });

      newOrder.user = this.getOrderUser(user);

      newOrder.originPrice = newOrder.listItems.reduce((total, itemDetail) => {
        if (itemDetail.item.flashSale)
          return (total +=
            itemDetail.item.flashSale.priceBeforeDiscount *
            itemDetail.quantity);
        return (total += itemDetail.item.price * itemDetail.quantity);
      }, 0);

      newOrder.totalPrice = newOrder.originPrice;
    }

    return this.ordersRepository.create(newOrder);
  }

  getOrderUser(user: IUser) {
    return {
      userId: user._id,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      address: user.address,
    };
  }

  getOrdrVoucher(voucher: IVoucher) {
    return {
      voucherId: voucher._id,
      code: voucher.code,
      discount: voucher.discount,
    };
  }

  getOrderItemSummary(item: IItem) {
    return {
      itemId: item._id,
      itemName: item.name,
      barCode: item.barCode,
      price: item.price,
      avatarImage: item.avataImage,
      category: item.category,
      flashSale: item.flashSale,
    };
  }
}
