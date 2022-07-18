import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
} from '../../swagger/error-exception';

import { ObjectIdDto } from '../../common/dtos';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { ItemResponse, NewItemDto, UpdateItemDto } from './dtos';
import { QueryItemDto } from './dtos/query-item.dto';
import { IItem } from './entities';
import { ItemsService } from './items.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Create item' })
  @ApiCreatedResponse({
    description: 'The item has been successfully created.',
    type: ItemResponse,
  })
  @ApiBadRequestResponse({
    description: 'Create item error!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Post()
  createItem(@Body() newItem: NewItemDto): Promise<IItem> {
    return this.itemsService.createItem(newItem);
  }

  // FIND LIST ITEMS
  @ApiOperation({ summary: 'Find list items' })
  @ApiOkResponse({
    description: 'Find list items',
    type: [ItemResponse],
  })
  @ApiInternalServerErrorResponse({
    description: 'Find list items error!',
    type: InternalServerErrorResponse,
  })
  @Get()
  findListItems(@Query() query?: QueryItemDto): Promise<IItem[]> {
    return this.itemsService.findListItems(query);
  }

  // FIND ITEM BY ID
  @ApiOperation({ summary: 'Find item by id' })
  @ApiOkResponse({
    description: 'Find item by id.',
    type: ItemResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Find item error!',
    type: InternalServerErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'The item is not exist!',
    type: BadRequestResponse,
  })
  @Get(':id')
  findItemById(@Param() param: ObjectIdDto): Promise<IItem> {
    return this.itemsService.findItemById(param.id);
  }

  // UPDATE ITEM BY ID
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Update item' })
  @ApiCreatedResponse({
    description: 'The item has been updated successfully.',
    type: ItemResponse,
  })
  @ApiBadRequestResponse({
    description: 'The item is not exist!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiInternalServerErrorResponse({
    description: 'Update item error!',
    type: InternalServerErrorResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Put(':id')
  findItemByIdAndUpdate(
    @Param() param: ObjectIdDto,
    @Body() updateItem: UpdateItemDto,
  ): Promise<IItem> {
    return this.itemsService.findItemByIdAndUpdate(param.id, updateItem);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Delete item' })
  @ApiNoContentResponse({
    description: 'The item has been deleted successfully.',
    type: ItemResponse,
  })
  @ApiBadRequestResponse({
    description: 'The item is not exist!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiInternalServerErrorResponse({
    description: 'Delete item error!',
    type: InternalServerErrorResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':id')
  findItemByIdAndDelete(@Param() param: ObjectIdDto) {
    return this.itemsService.findItemByIdAndDelete(param.id);
  }
}
