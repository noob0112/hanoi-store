import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { ICategoryItemSummary } from '../categories/entities';
import { FlashSalesService } from '../flash-sales/flash-sales.service';

import { IItem, INewItem, IQueryItem, IUpdateItem } from './entities';
import { ItemsRepository } from './items.repository';

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

  async findAllItem(query: IQueryItem): Promise<IItem[]> {
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
  ): Promise<IItem> {
    const item = await this.itemsRepository
      .findByIdAndUpdate(itemId, {
        $inc: { stock: -1 * quantity, countOfSelling: 1 },
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    const filterFlashSale = { isOnGoing: true };
    const selectFlashSale = {};
    const flashSale = await this.flashSalesService.findOneFlashSale(
      filterFlashSale,
      selectFlashSale,
    );

    return this.checkFlashSale(item, flashSale);
  }

  async findItemByIdAndUpdate(
    itemId: string,
    updateItem: IUpdateItem,
  ): Promise<IItem> {
    // IF UPDATE CATEGORY => GET CATEGORY NAME
    if (updateItem.category.categoryId) {
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

    return item;
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

  checkFlashSale(item, flashSale) {
    if (!flashSale) {
      return {
        ...item['_doc'],
        flashSale: null,
      };
    }

    const flashSaleItem = flashSale.listItems.find((flashSaleItem) => {
      return String(flashSaleItem.itemId) === String(item._id);
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
      },
    };
  }
}
