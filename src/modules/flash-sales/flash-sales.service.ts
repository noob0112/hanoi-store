import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NewFlashSaleDto } from './dtos/new-flash-sale.dto';
import { FlashSalesRepository } from './flash-sales.repository';
import { IFlashSale, IFlashSaleAddItem } from './entities';
import { FLASH_SALES_OPTIONS_ENUM } from './flash-sales.constant';

@Injectable()
export class FlashSalesService {
  constructor(readonly flashSalesRepository: FlashSalesRepository) {}

  async creatFlashSale(newFlashSale: NewFlashSaleDto): Promise<IFlashSale> {
    return await this.flashSalesRepository
      .create(newFlashSale)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  async findAllFlashSales(): Promise<IFlashSale[]> {
    const filter = {};
    const select = {
      listItems: 0,
    };
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
    newItemFlashSaleDto: IFlashSaleAddItem,
  ): Promise<IFlashSale> {
    return this.updateFlashSaleById(flashSaleId, {
      listItems: newItemFlashSaleDto,
    });
  }
}
