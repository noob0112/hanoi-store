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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '../../swagger/error-exception';
import { FlashSaleResponse } from './dtos/flash-sale-response.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { ROLE_ENUM } from '../users/users.constant';

@Controller('flash-sales')
@ApiTags('flash-sales')
export class FlashSalesController {
  constructor(readonly flashSalesService: FlashSalesService) {}

  // Create flash sale
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Create flash sale' })
  @ApiCreatedResponse({
    description: 'The flash sale has been created successfully.',
    type: FlashSaleResponse,
  })
  @ApiBadRequestResponse({
    description: 'The flash sale create error!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Post()
  createFlashSale(@Body() newFlashSale: NewFlashSaleDto): Promise<IFlashSale> {
    return this.flashSalesService.createFlashSale(newFlashSale);
  }

  // Find list flash sales
  @ApiOperation({ summary: 'Find list flash sales' })
  @ApiOkResponse({
    description: 'Find list flash sales successfully.',
    type: [FlashSaleResponse],
  })
  @ApiInternalServerErrorResponse({
    description: 'List flash sales find error!',
    type: InternalServerErrorResponse,
  })
  @Get()
  findListFlashSales(
    @Query() query?: QueryFlashSaleDto,
  ): Promise<IFlashSale[]> {
    return this.flashSalesService.findListFlashSales(query);
  }

  // Find a flash sale by id
  @ApiOperation({ summary: 'Find a flash sale by id' })
  @ApiOkResponse({
    description: 'Find flash sale successfully.',
    type: FlashSaleResponse,
  })
  @ApiNotFoundResponse({
    description: 'The flash sale does not exist!',
    type: NotFoundResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'The flash sale finds error!',
    type: InternalServerErrorResponse,
  })
  @Get(':id')
  findFlashSaleById(@Param() param: ObjectIdDto): Promise<IFlashSale> {
    return this.flashSalesService.findFlashSaleById(param.id);
  }

  // @Get(':id/detail')
  // findFlashSaleDetailById(@Param() param: ObjectIdDto): Promise<IFlashSale> {
  //   return this.flashSalesService.findFlashSaleById(param.id);
  // }

  // Update flash sale by id
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] update flash sale' })
  @ApiOkResponse({
    description: 'The flash sale has been updated successfully.',
    type: FlashSaleResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiInternalServerErrorResponse({
    description: 'Update flash sale error!',
    type: InternalServerErrorResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
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

  // Update status flash sale
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] update status flash sale' })
  @ApiOkResponse({
    description: 'The status of flash sale has been updated successfully.',
    type: FlashSaleResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
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

  // Update flash sale
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Add item to flash sale' })
  @ApiOkResponse({
    description: 'Add item to flash sale successfully.',
    type: FlashSaleResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({
    description: 'The flash sale does not exist!',
    type: NotFoundResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Add Item to flash sale error!',
    type: InternalServerErrorResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
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

  // Delete flash sale
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Delete flash sale' })
  @ApiNoContentResponse({
    description: 'Delete flash sale successfully.',
    type: FlashSaleResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({
    description: 'The flash sale does not exist!',
    type: NotFoundResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Delete flash sale error!',
    type: InternalServerErrorResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':id')
  findFlashSaleAndDeleteById(
    @Param() param: ObjectIdDto,
  ): Promise<void | boolean> {
    return this.flashSalesService.findFlashSaleAndDeleteById(param.id);
  }
}
