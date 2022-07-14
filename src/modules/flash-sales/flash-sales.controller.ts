import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectIdDto } from 'src/common/dtos';
import {
  NewFlashSaleDto,
  FlashSaleAddItemDto,
  UpdateFlashSaleDto,
  UpdateFlashSaleStatusDto,
} from './dtos';
import { FlashSalesService } from './flash-sales.service';
import { IFlashSale } from './entities';

@Controller('flash-sales')
@ApiTags('flash-sales')
export class FlashSalesController {
  constructor(readonly flashSalesService: FlashSalesService) {}

  @Post()
  createFlashSale(@Body() newFlashSale: NewFlashSaleDto): Promise<IFlashSale> {
    return this.flashSalesService.creatFlashSale(newFlashSale);
  }

  @Get()
  findAllFlashSales(): Promise<IFlashSale[]> {
    return this.flashSalesService.findAllFlashSales();
  }

  @Get(':id')
  findFlashSaleById(@Param() param: ObjectIdDto): Promise<IFlashSale> {
    return this.flashSalesService.findFlashSaleById(param.id);
  }

  @Get(':id/detail')
  findFlashSaleDetailById(@Param() param: ObjectIdDto): Promise<IFlashSale> {
    return this.flashSalesService.findFlashSaleById(param.id);
  }

  @Put(':id')
  updateFlashSaleById(
    @Param() param: ObjectIdDto,
    @Body() updateFlashSale: UpdateFlashSaleDto,
  ): Promise<IFlashSale> {
    return this.flashSalesService.updateFlashSaleById(
      param.id,
      updateFlashSale,
    );
  }

  @Put(':id/status')
  updateFlashSaleStatusById(
    @Param() param: ObjectIdDto,
    @Body() updateFlashSaleStatus: UpdateFlashSaleStatusDto,
  ): Promise<IFlashSale> {
    return this.flashSalesService.updateFlashSaleById(
      param.id,
      updateFlashSaleStatus,
    );
  }

  @Put(':id/items')
  addItemToFlashSale(
    @Param() param: ObjectIdDto,
    @Body() newFlashSaleItemDto: FlashSaleAddItemDto,
  ): Promise<IFlashSale> {
    return this.flashSalesService.addItemToFlashSale(
      param.id,
      newFlashSaleItemDto,
    );
  }
}
