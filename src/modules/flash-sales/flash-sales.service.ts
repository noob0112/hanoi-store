import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { FlashSalesRepository } from './flash-sales.repository';
import { IFlashSale, IFlashSaleAddItem, INewFlashSale } from './entities';
import { FLASH_SALES_OPTIONS_ENUM } from './flash-sales.constant';
import { ItemsService } from '../items/items.service';
import { IItem } from '../items/entities';

@Injectable()
export class FlashSalesService {
  constructor(
    readonly flashSalesRepository: FlashSalesRepository,
    @Inject(forwardRef(() => ItemsService))
    readonly itemsService: ItemsService,
  ) {}

  async creatFlashSale(newFlashSale: INewFlashSale): Promise<IFlashSale> {
    return await this.flashSalesRepository
      .create(newFlashSale)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  async findAllFlashSales(): Promise<IFlashSale[]> {
    return await this.flashSalesRepository
      .find({ startTime: { $gte: Date.now() } })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  async findListFlashSales(): Promise<IFlashSale[]> {
    const filter = {};
    const select = {};
    const options = {
      limit: FLASH_SALES_OPTIONS_ENUM.LIMIT,
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
    const flashSale = await this.flashSalesRepository.findById(
      flashSaleId,
      select,
    );

    if (!flashSale) {
      throw new NotFoundException('Flash sale does not exist!');
    }

    return flashSale;
  }

  async findOneFlashSale(filter = {}, select = {}) {
    return this.flashSalesRepository.findOne(filter, select);
  }

  updateFlashSaleItem(flashSaleId: string, item: IItem) {
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

  updateStockItemFlashSale(
    flashSaleId: string,
    itemId: string,
    quantity: number,
  ) {
    return this.flashSalesRepository.updateOne(
      {
        _id: flashSaleId,
        'listItems.item.itemId': itemId,
      },
      { $inc: { 'listItems.$.stockFlashSale': -1 * quantity } },
      { fields: { 'listItems.$': 1 }, new: true },
    );
  }

  async updateFlashSaleById(
    flasSaleId: string,
    updateFlashSale,
  ): Promise<IFlashSale> {
    return await this.flashSalesRepository.findByIdAndUpdate(flasSaleId, {
      $set: updateFlashSale,
    });
  }

  async addItemToFlashSale(
    flashSaleId: string,
    newFlashSaleItem: IFlashSaleAddItem,
  ): Promise<IFlashSale> {
    const itemIsExisted = await this.flashSalesRepository.findOne({
      _id: flashSaleId,
      'listItems.item.itemId': newFlashSaleItem.itemId,
    });

    if (itemIsExisted) {
      throw new BadRequestException('Item is existed in flash sale!');
    }

    const item = await this.itemsService.findItemById(newFlashSaleItem.itemId);
    return this.flashSalesRepository.findByIdAndUpdate(flashSaleId, {
      $push: {
        listItems: {
          item: this.getFlashSaleItem(item),
          priceBeforeDiscount: newFlashSaleItem.priceBeforeDiscount,
          stockFlashSale: newFlashSaleItem.stockFlashSale,
        },
      },
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

  private getFlashSaleItem(item: IItem) {
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
