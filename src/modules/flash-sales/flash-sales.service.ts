import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
// import pLimit from 'p-limit';

import { FlashSalesRepository } from './flash-sales.repository';
import {
  IFlashSale,
  IFlashSaleAddItem,
  IItemSummary,
  INewFlashSale,
  IQueryFlashSale,
  IUpdateFlashSale,
} from './entities';
import { FLASH_SALES_OPTIONS_ENUM } from './flash-sales.constant';
import { ItemsService } from '../items/items.service';
import { IItem } from '../items/entities';
import { USER_STATUS_ENUM } from '../users/users.constant';
import { UsersService } from '../users/users.service';
import { EmailService } from '../emails/emails.service';

@Injectable()
export class FlashSalesService {
  constructor(
    readonly flashSalesRepository: FlashSalesRepository,
    readonly emailService: EmailService,
    readonly usersService: UsersService,
    readonly schedulerRegistry: SchedulerRegistry,
    @Inject(forwardRef(() => ItemsService))
    readonly itemsService: ItemsService,
  ) {}

  async createFlashSale(newFlashSale: INewFlashSale): Promise<IFlashSale> {
    const lastFlashSale = await this.flashSalesRepository.find(
      {},
      {},
      { sort: { _id: -1 }, limit: 1 },
    );

    if (
      lastFlashSale[0].endTime.getTime() >
      new Date(newFlashSale.startTime).getTime()
    ) {
      throw new BadRequestException(
        'Please input startTime more than endTime of last flash sale',
      );
    }

    const flashSale = await this.flashSalesRepository
      .create(newFlashSale)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    const date =
      new Date(flashSale.startTime).getTime() -
      parseFloat(process.env.TIME_NOTIFICATION) * 60 * 1000;

    if (date < new Date().getTime()) {
      throw new BadRequestException(
        `Please input startTime more great than Date now 15'`,
      );
    }

    // const limit = pLimit(10);

    const job = new CronJob(new Date(date), async () => {
      const allUser = await this.usersService.findAllUser({
        status: USER_STATUS_ENUM.ACTION,
      });

      const allPromise = allUser.map((i) => {
        // return limit(() =>
        return this.emailService.sendMail(
          i.email,
          flashSale.startTime,
          'THÔNG BÁO FLASH SALE',
        );

        // );
      });

      Promise.map(allPromise, (job) => job, { concurrency: 5 });
    });
    this.schedulerRegistry.addCronJob(`${Date.now()}`, job);
    job.start();
    return flashSale;
  }

  async findAllFlashSales(): Promise<IFlashSale[]> {
    return await this.flashSalesRepository
      .find({ startTime: { $gte: Date.now() } })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  async findListFlashSales(query?: IQueryFlashSale): Promise<IFlashSale[]> {
    const filter = {};
    const select = {};
    const options = {
      limit: FLASH_SALES_OPTIONS_ENUM.LIMIT,
      skip: FLASH_SALES_OPTIONS_ENUM.LIMIT * ((query?.page - 1) | 0),
    };

    return await this.flashSalesRepository
      .find(filter, select, options)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  async findFlashSaleById(
    flashSaleId: string,
    select = {},
  ): Promise<IFlashSale> {
    const flashSale = await this.flashSalesRepository
      .findById(flashSaleId, select)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (!flashSale) {
      throw new NotFoundException('Flash sale does not exist!');
    }

    return flashSale;
  }

  public async findOneFlashSale(filter = {}, select = {}) {
    return this.flashSalesRepository.findOne(filter, select);
  }

  public updateFlashSaleItem(flashSaleId: string, item: IItem) {
    return this.flashSalesRepository.updateOne(
      {
        _id: flashSaleId,
        startTime: { $gte: Date.now() },
        'listItems.item.itemId': item._id,
      },
      { $set: { 'listItems.$.item': this.getFlashSaleItem(item) } },
      { fields: { 'listItems.$.item': 1 }, new: true },
    );
  }

  public updateStockItemFlashSale(
    flashSaleId: string,
    itemId: string,
    quantity: number,
    session: mongoose.ClientSession | null = null,
  ) {
    return this.flashSalesRepository.updateOne(
      {
        _id: flashSaleId,
        'listItems.item.itemId': itemId,
      },
      { $inc: { 'listItems.$.stockFlashSale': -1 * quantity } },
      { session: session, fields: { 'listItems.$': 1 }, new: true },
    );
  }

  async updateFlashSaleById(
    flasSaleId: string,
    updateFlashSale: IUpdateFlashSale,
  ): Promise<IFlashSale> {
    return await this.flashSalesRepository
      .findByIdAndUpdate(flasSaleId, {
        $set: updateFlashSale,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  async addItemToFlashSale(
    flashSaleId: string,
    newFlashSaleItem: IFlashSaleAddItem,
  ): Promise<IFlashSale> {
    const itemIsExisted = await this.flashSalesRepository
      .findOne({
        _id: flashSaleId,
        'listItems.item.itemId': newFlashSaleItem.itemId,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (itemIsExisted) {
      throw new BadRequestException('Item is existed in flash sale!');
    }

    const item = await this.itemsService.findItemById(newFlashSaleItem.itemId);
    return this.flashSalesRepository
      .findByIdAndUpdate(flashSaleId, {
        $push: {
          listItems: {
            item: this.getFlashSaleItem(item),
            priceBeforeDiscount: newFlashSaleItem.priceBeforeDiscount,
            stockFlashSale: newFlashSaleItem.stockFlashSale,
          },
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  async findFlashSaleAndDeleteById(flashSaleId): Promise<void | boolean> {
    const flashSale = await this.flashSalesRepository
      .findByIdAndDelete(flashSaleId)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (!flashSale) {
      throw new InternalServerErrorException('Flash sale does not exist!');
    }
    return;
  }

  private getFlashSaleItem(item: IItem): IItemSummary {
    return {
      itemId: item._id,
      itemName: item.name,
      barCode: item.barCode,
      price: item.price,
      avataImage: item.avataImage,
      stock: item.stock,
      historicalSold: item.historicalSold,
      category: item.category,
    };
  }
}
