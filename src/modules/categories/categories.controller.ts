import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectIdDto } from '../../common/dtos';
import { CategoriesService } from './categories.service';
import { NewCategoryDto, StatusCategoryDto, UpdateCategoryDto } from './dtos';
import { ICategory } from './entities';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(readonly categoriesService: CategoriesService) {}

  // CREATE CATEGORY
  @Post()
  createCategory(@Body() newCategory: NewCategoryDto): Promise<ICategory> {
    return this.categoriesService.createCategory(newCategory);
  }

  // FIND ALL CATEGORY
  @Get()
  findAllCategories(): Promise<ICategory[]> {
    return this.categoriesService.findAllCategories();
  }

  // FIND A CATEGORY
  @Get(':id')
  findCategoryById(@Param() param: ObjectIdDto): Promise<ICategory> {
    return this.categoriesService.findCategoryById(param.id);
  }

  // UPDATE NAME OR BANNER
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
  @Put(':id/status')
  updateStatusCategoryById(
    @Param() param: ObjectIdDto,
    @Body() status: StatusCategoryDto,
  ): Promise<ICategory> {
    return this.categoriesService.findAndUpdateCategoryById(param.id, status);
  }

  // DELETE CATEGORY
  @Delete(':id')
  deleteCategory(@Param() param: ObjectIdDto): Promise<void> {
    return this.categoriesService.findAndDeleteCategoryById(param.id);
  }
}
