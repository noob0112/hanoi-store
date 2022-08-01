import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

import { CategoriesService } from '../categories/categories.service';
import { ItemsRepository } from './items.repository';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ICategoryItemSummary } from '../categories/entities';
import { IFlashSale } from '../flash-sales/entities';
import { IItem, INewItem, IQueryItem, IUpdateItem } from './entities';

@Injectable()
export class ItemsService {
  constructor(
    readonly itemsRepository: ItemsRepository,
    readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => FlashSalesService))
    readonly flashSalesService: FlashSalesService,
  ) {}

  async createItem(newItem: INewItem): Promise<IItem> {
    // VALIDATE CATEGORY
    const category = await this.categoriesService
      .findCategoryById(String(newItem.category.categoryId))
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    newItem.category.categoryName = category.name;

    // CREATE ITEM
    const item = await this.itemsRepository.create(newItem).catch((error) => {
      throw new BadRequestException(error.message);
    });

    const itemSummary = this.getItemSummary(item);

    // ADD ITEM TO CATEGORY
    this.categoriesService.findAndAddItem(
      String(item.category.categoryId),
      itemSummary,
    );

    return item;
  }

  async findListItems(query?: IQueryItem): Promise<IItem[]> {
    const listItems = await this.itemsRepository
      .findListItem(query)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    const filter = { isOnGoing: true };
    const select = {};
    const flashSale = await this.flashSalesService.findOneFlashSale(
      filter,
      select,
    );

    return listItems.map((item) => {
      return this.checkFlashSale(item, flashSale);
    });
  }

  async findItemById(itemId: string): Promise<IItem> {
    const item = await this.itemsRepository
      .findItemById(itemId)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
    if (!item) {
      throw new BadRequestException('item is not exist!');
    }

    const filterFlashSale = { isOnGoing: true };
    const selectFlashSale = {};
    const flashSale = await this.flashSalesService.findOneFlashSale(
      filterFlashSale,
      selectFlashSale,
    );

    return this.checkFlashSale(item, flashSale);
  }

  // Minus stoke and plus countOfSelling
  async findItemByIdAndUpdateStock(
    itemId: string,
    quantity: number,
    session: mongoose.ClientSession | null = null,
  ): Promise<IItem> {
    // Check stock
    const itemFind = await this.itemsRepository.findById(itemId);

    if (!itemFind) {
      throw new NotFoundException('Item does not exist!');
    }

    if (itemFind.stock < quantity) {
      throw new BadRequestException(`Not buy quantity than ${itemFind.stock}`);
    }

    const item = await this.itemsRepository
      .findByIdAndUpdate(
        itemId,
        {
          $inc: { stock: -1 * quantity, countOfSelling: 1 },
        },
        { session: session },
      )
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    if (!item) {
      throw new NotFoundException('Item does not exist!');
    }

    const filterFlashSale = { isOnGoing: true };
    const selectFlashSale = {};
    const flashSale = await this.flashSalesService.findOneFlashSale(
      filterFlashSale,
      selectFlashSale,
    );

    const itemFlashSale = this.checkFlashSale(item, flashSale);

    if (
      itemFlashSale.flashSale &&
      itemFlashSale.flashSale.stockFlashSale !== 0 &&
      itemFlashSale.flashSale.stockFlashSale >= quantity
    ) {
      await this.flashSalesService.updateStockItemFlashSale(
        String(itemFlashSale.flashSale.flashSaleId),
        item._id,
        quantity,
        session,
      );
      // flashSale - 1
    }

    return itemFlashSale;
  }

  async findItemByIdAndUpdateSold(
    itemId: string,
    sold: number,
  ): Promise<IItem> {
    return this.itemsRepository.findByIdAndUpdate(itemId, {
      $inc: { historicalSold: 1 * sold, countOfSelling: -1 },
    });
  }

  async findItemByIdAndUpdateCancel(
    itemId: string,
    cancel: number,
  ): Promise<IItem> {
    return this.itemsRepository.findByIdAndUpdate(itemId, {
      $inc: { stock: 1 * cancel, countOfSelling: -1 },
    });
  }

  async findItemByIdAndUpdate(
    itemId: string,
    updateItem: IUpdateItem,
  ): Promise<IItem> {
    // IF UPDATE CATEGORY => GET CATEGORY NAME
    if (updateItem.category && updateItem.category.categoryId) {
      const category = await this.categoriesService.findCategoryById(
        String(updateItem.category.categoryId),
      );

      updateItem.category.categoryName = category.name;
    }

    const item = await this.itemsRepository
      .findByIdAndUpdate(itemId, {
        $set: updateItem,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (!item) {
      throw new BadRequestException('item is not exist!');
    }

    await this.categoriesService.updateCategoryItem(
      String(item.category.categoryId),
      this.getItemSummary(item),
    );

    const allFlashSale = await this.flashSalesService.findAllFlashSales();

    allFlashSale.forEach(async (flashSale) => {
      const flashSaleSummaryItem = this.checkFlashSale(item, flashSale);
      const flashSaleSummary = flashSaleSummaryItem.flashSale;
      console.log(flashSaleSummary);
      if (flashSaleSummary) {
        await this.flashSalesService.updateFlashSaleItem(
          String(flashSaleSummary.flashSaleId),
          item,
        );
      }
    });

    return item;
  }

  findItemByIdAndDelete(itemId: string): Promise<void | boolean> {
    this.itemsRepository.findByIdAndDelete(itemId);
    return;
  }

  getItemSummary(item): ICategoryItemSummary {
    return {
      itemId: item._id,
      barCode: item.barCode,
      itemName: item.name,
      avatarImage: item.avataImage,
      price: item.price,
      historicalSold: item.historicalSold,
      stock: item.stock,
    };
  }

  checkFlashSale(item, flashSale: IFlashSale): IItem {
    if (!flashSale) {
      return {
        ...item['_doc'],
        flashSale: null,
      };
    }

    const flashSaleItem = flashSale.listItems.find((flashSaleItem) => {
      return (
        flashSaleItem.item &&
        String(flashSaleItem.item.itemId) === String(item._id)
      );
    });

    if (!flashSaleItem) {
      return {
        ...item['_doc'],
        flashSale: null,
      };
    }

    return {
      ...item['_doc'],
      flashSale: {
        flashSaleId: flashSale._id,
        startTime: flashSale.startTime,
        endTime: flashSale.endTime,
        priceBeforeDiscount: flashSaleItem.priceBeforeDiscount,
        stockFlashSale: flashSaleItem.stockFlashSale,
      },
    };
  }
}
