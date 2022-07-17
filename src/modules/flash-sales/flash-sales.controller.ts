import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectIdDto } from '../../common/dtos';
import {
  NewFlashSaleDto,
  FlashSaleAddItemDto,
  UpdateFlashSaleDto,
  UpdateFlashSaleStatusDto,
} from './dtos';
import { FlashSalesService } from './flash-sales.service';
import { IFlashSale } from './entities';
import { QueryFlashSaleDto } from './dtos/query-flash-sale.dto';

@Controller('flash-sales')
@ApiTags('flash-sales')
export class FlashSalesController {
  constructor(readonly flashSalesService: FlashSalesService) {}

  @Post()
  createFlashSale(@Body() newFlashSale: NewFlashSaleDto): Promise<IFlashSale> {
    return this.flashSalesService.createFlashSale(newFlashSale);
  }

  @Get()
  findListFlashSales(
    @Query() query?: QueryFlashSaleDto,
  ): Promise<IFlashSale[]> {
    return this.flashSalesService.findListFlashSales(query);
  }

  @Get(':id')
  findFlashSaleById(@Param() param: ObjectIdDto): Promise<IFlashSale> {
    return this.flashSalesService.findFlashSaleById(param.id);
  }

  // @Get(':id/detail')
  // findFlashSaleDetailById(@Param() param: ObjectIdDto): Promise<IFlashSale> {
  //   return this.flashSalesService.findFlashSaleById(param.id);
  // }

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

  @Delete(':id')
  findFlashSaleAndDeleteById(
    @Param() param: ObjectIdDto,
  ): Promise<void | boolean> {
    return this.flashSalesService.findFlashSaleAndDeleteById(param.id);
  }
}
