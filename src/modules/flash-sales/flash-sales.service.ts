import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NewFlashSaleDto } from './dtos/new-flash-sale.dto';
import { FlashSalesRepository } from './flash-sales.repository';
import { IFlashSale, IFlashSaleAddItem } from './entities';
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

  async creatFlashSale(newFlashSale: NewFlashSaleDto): Promise<IFlashSale> {
    return await this.flashSalesRepository
      .create(newFlashSale)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  async findAllFlashSales(): Promise<IFlashSale[]> {
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
      'listItems.itemId': newFlashSaleItem.itemId,
    });

    if (itemIsExisted) {
      throw new BadRequestException('Item is existed in flash sale!');
    }

    const item = await this.itemsService.findItemById(newFlashSaleItem.itemId);
    return this.flashSalesRepository.findByIdAndUpdate(flashSaleId, {
      $push: {
        listItems: this.getFlashSaleItem(
          item,
          newFlashSaleItem.priceBeforeDiscount,
        ),
      },
    });
  }

  getFlashSaleItem(item: IItem, priceBeforeDiscount: number) {
    return {
      itemId: item._id,
      itemName: item.name,
      barCode: item.barCode,
      price: item.price,
      priceBeforeDiscount,
      avataImage: item.avataImage,
      stock: item.stock,
      historicalSold: item.historicalSold,
      category: item.category,
    };
  }
}
