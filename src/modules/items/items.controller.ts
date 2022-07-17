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
import { NewItemDto, UpdateItemDto } from './dtos';
import { QueryItemDto } from './dtos/query-item.dto';
import { IItem } from './entities';
import { ItemsService } from './items.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  createItem(@Body() newItem: NewItemDto): Promise<IItem> {
    return this.itemsService.createItem(newItem);
  }

  @Get()
  findListItems(@Query() query?: QueryItemDto): Promise<IItem[]> {
    return this.itemsService.findListItems(query);
  }

  @Get(':id')
  findItemById(@Param() param: ObjectIdDto): Promise<IItem> {
    return this.itemsService.findItemById(param.id);
  }

  @Put(':id')
  findItemByIdAndUpdate(
    @Param() param: ObjectIdDto,
    @Body() updateItem: UpdateItemDto,
  ): Promise<IItem> {
    return this.itemsService.findItemByIdAndUpdate(param.id, updateItem);
  }

  @Delete(':id')
  findItemByIdAndDelete(@Param() param: ObjectIdDto) {
    return this.itemsService.findItemByIdAndDelete(param.id);
  }
}
