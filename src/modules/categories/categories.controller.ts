import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '../../swagger/error-exception';
import { ObjectIdDto } from '../../common/dtos';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CategoriesService } from './categories.service';
import {
  CategoryResponse,
  NewCategoryDto,
  StatusCategoryDto,
  UpdateCategoryDto,
} from './dtos';
import { ICategory } from './entities';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(readonly categoriesService: CategoriesService) {}

  // CREATE CATEGORY
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Create category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully created.',
    type: CategoryResponse,
  })
  @ApiBadRequestResponse({
    description: 'The category name is existed!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Post()
  createCategory(@Body() newCategory: NewCategoryDto): Promise<ICategory> {
    return this.categoriesService.createCategory(newCategory);
  }

  // FIND LIST CATEGORIES
  @ApiOperation({ summary: 'Find list categories' })
  @ApiOkResponse({
    description: 'find list categories successfully.',
    type: [CategoryResponse],
  })
  @ApiInternalServerErrorResponse({
    description: 'Other Error',
    type: InternalServerErrorResponse,
  })
  @Get()
  findListCategories(): Promise<ICategory[]> {
    return this.categoriesService.findListCategories();
  }

  // FIND A CATEGORY BY ID
  @ApiOperation({ summary: 'Find category by id' })
  @ApiOkResponse({
    description: 'find category successfully.',
    type: CategoryResponse,
  })
  @ApiNotFoundResponse({
    description: 'Category Id is incorrect or not exist!',
    type: NotFoundResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Other Error',
    type: InternalServerErrorResponse,
  })
  @Get(':id')
  findCategoryById(@Param() param: ObjectIdDto): Promise<ICategory> {
    return this.categoriesService.findCategoryById(param.id);
  }

  // UPDATE NAME OR BANNER
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Update name or banner of category' })
  @ApiOkResponse({
    description: 'update category successfully.',
    type: CategoryResponse,
  })
  @ApiNotFoundResponse({
    description: 'Category Id is incorrect or not exist!',
    type: NotFoundResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Put(':id')
  updateCategoryById(
    @Param() param: ObjectIdDto,
    @Body() updateCategory: UpdateCategoryDto,
  ): Promise<ICategory> {
    return this.categoriesService.findAndUpdateCategoryById(
      param.id,
      updateCategory,
    );
  }

  // UPDATE STATUS CATEGORY
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Update status of category' })
  @ApiOkResponse({
    description: 'update category successfully.',
    type: CategoryResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({
    description: 'Category Id is incorrect or not exist!',
    type: NotFoundResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Put(':id/status')
  updateStatusCategoryById(
    @Param() param: ObjectIdDto,
    @Body() status: StatusCategoryDto,
  ): Promise<ICategory> {
    return this.categoriesService.findAndUpdateCategoryById(param.id, status);
  }

  // DELETE CATEGORY
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Delte category' })
  @ApiNoContentResponse({
    description: 'Delete category successfully.',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Category Id has a item or more',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({
    description: 'Category Id is incorrect or not exist!',
    type: NotFoundResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Other Error',
    type: InternalServerErrorResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCategory(@Param() param: ObjectIdDto): Promise<void> {
    return this.categoriesService.findAndDeleteCategoryById(param.id);
  }
}
