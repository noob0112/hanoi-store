import {
  BadRequestException,
  Injectable,
  // InternalServerErrorException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { objectId } from 'src/common/types';

import { OrdersRepository } from './orders.repository';
import { CategoriesService } from '../categories/categories.service';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';
import { VouchersService } from '../vouchers/vouchers.service';
import { IItem } from '../items/entities';
import { IUser } from '../users/entities';
import { IVoucher } from '../vouchers/entities';
import { IOrder, INewOrder, IUpdateOrderStatus } from './entities';
import { ORDER_STATUS_ENUM } from './orders.constant';

@Injectable()
export class OrdersService {
  constructor(
    readonly ordersRepository: OrdersRepository,
    readonly itemsService: ItemsService,
    readonly vouchersService: VouchersService,
    readonly flashSalesService: FlashSalesService,
    readonly categoriesService: CategoriesService,
    readonly usersService: UsersService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  // Create Order
  async createOrder(order: INewOrder, userId: string): Promise<IOrder> {
    const newOrder: IOrder = {
      listItems: [],
      user: undefined,
      originPrice: 0,
      totalPrice: 0,
    };

    // Start transaction
    const session = await this.connection.startSession();
    session.startTransaction();

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

    if (order.voucherId) {
      const promiseVoucher = new Promise((resolve, reject) => {
        this.vouchersService
          .findVoucherByIdAndUpdateQuantity(order.voucherId, session)
          .then((doc) => {
            resolve(doc);
          })
          .catch((error) => {
            reject(error);
          });
      });

      task.push(promiseVoucher);
    }

    order.listItems.forEach((itemDetail) => {
      task.push(
        new Promise((resolve, reject) => {
          this.itemsService
            .findItemByIdAndUpdateStock(
              String(itemDetail.itemId),
              itemDetail.quantity,
              session,
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

    try {
      // HAVE VOUCHER => task[user, voucher, ...listItems]
      if (order.voucherId) {
        const [user, voucher, ...listItems] = await Promise.all(task).catch(
          (error) => {
            throw new BadRequestException(error.message);
          },
        );

        listItems.forEach(({ item, quantity }) => {
          newOrder.listItems.push({
            item: this.getOrderItemSummary(item),
            quantity,
          });
        });

        newOrder.voucher = this.getOrdrVoucher(voucher);

        newOrder.user = this.getOrderUser(user);

        newOrder.originPrice = newOrder.listItems.reduce(
          (total, itemDetail) => {
            if (itemDetail.item.flashSale)
              return (total +=
                itemDetail.item.flashSale.priceBeforeDiscount *
                itemDetail.quantity);
            return (total += itemDetail.item.price * itemDetail.quantity);
          },
          0,
        );

        if (newOrder.originPrice - newOrder.voucher.discount <= 0)
          newOrder.totalPrice = 0;

        if (newOrder.originPrice - newOrder.voucher.discount > 0)
          newOrder.totalPrice =
            newOrder.originPrice - newOrder.voucher.discount;
      }

      // NOT HAVE VOUCHER => task[user, ...listItems]
      if (!order.voucherId) {
        const [user, ...listItems] = await Promise.all(task).then((docs) => {
          return docs;
        });

        listItems.forEach(({ item, quantity }) => {
          newOrder.listItems.push({
            item: this.getOrderItemSummary(item),
            quantity,
          });
        });

        newOrder.user = this.getOrderUser(user);

        newOrder.originPrice = newOrder.listItems.reduce(
          (total, itemDetail) => {
            if (itemDetail.item.flashSale)
              return (total +=
                itemDetail.item.flashSale.priceBeforeDiscount *
                itemDetail.quantity);
            return (total += itemDetail.item.price * itemDetail.quantity);
          },
          0,
        );

        newOrder.totalPrice = newOrder.originPrice;
      }

      const createOrder = await this.ordersRepository.create(newOrder);
      await session.commitTransaction();
      return createOrder;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error.message);
    } finally {
      session.endSession();
    }
  }

  // Update Satatus Order
  async findOrderByIdAndUpdateStatus(
    orderId: string | objectId,
    updateOrderStatus: IUpdateOrderStatus,
  ) {
    const order = await this.ordersRepository.findById(orderId);
    if (
      order.status === ORDER_STATUS_ENUM.CANCELED ||
      order.status === ORDER_STATUS_ENUM.DELIVERED
    ) {
      throw new BadRequestException(
        `Order can not update status when ${order.status}`,
      );
    }

    if (updateOrderStatus.status === ORDER_STATUS_ENUM.CANCELED) {
      order.listItems.forEach(async (orderDetail) => {
        await this.itemsService.findItemByIdAndUpdateCancel(
          String(orderDetail.item.itemId),
          orderDetail.quantity,
        );
      });
    }

    order.listItems.forEach(async (orderDetail) => {
      await this.itemsService.findItemByIdAndUpdateSold(
        String(orderDetail.item.itemId),
        orderDetail.quantity,
      );
    });

    return this.ordersRepository.findByIdAndUpdate(orderId, {
      $set: { status: updateOrderStatus.status },
    });
  }

  private getOrderUser(user: IUser) {
    return {
      userId: user._id,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      address: user.address,
    };
  }

  private getOrdrVoucher(voucher: IVoucher) {
    return {
      voucherId: voucher._id,
      code: voucher.code,
      discount: voucher.discount,
    };
  }

  private getOrderItemSummary(item: IItem) {
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
