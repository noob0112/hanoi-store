import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategorysRepository } from './categories.repository';
import {
  ICategoryItemSummary,
  INewCategory,
  IUpdateCategory,
} from './entities';
import { ICategory } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(readonly categoriesRepository: CategorysRepository) {}

  createCategory(newCategory: INewCategory): Promise<ICategory> {
    return this.categoriesRepository.create(newCategory).catch((error) => {
      if (Object.keys(error.keyPattern)[0] === 'name')
        throw new BadRequestException('Category name is existed!');
      throw new BadRequestException(error.message);
    });
  }

  findAllCategories(): Promise<ICategory[]> {
    const select = { listItems: 0 };
    const options = {
      sort: {
        field: 1,
      },
    };
    return this.categoriesRepository
      .find({}, select, options)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  async findCategoryById(id: string): Promise<ICategory> {
    const select = {
      listItems: 0,
    };
    const category = await this.categoriesRepository
      .findById(id, select)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (!category) {
      throw new NotFoundException('Category Id is incorrect or not exist!');
    }

    return category;
  }

  async findCategoryDetailById(id: string): Promise<ICategory> {
    const category = await this.categoriesRepository
      .findById(id)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (!category) {
      throw new NotFoundException('Category Id is incorrect or not exist!');
    }

    return category;
  }

  async findAndUpdateCategoryById(
    id: string,
    updateCategory: IUpdateCategory,
  ): Promise<ICategory> {
    const category = await this.categoriesRepository.findByIdAndUpdate(
      id,
      updateCategory,
      {
        new: true,
        fields: { listItems: 0 },
      },
    );

    if (!category) {
      throw new NotFoundException('Category Id is incorrect or not exist!');
    }
    return category;
  }

  findAndAddItem(
    id: string,
    itemSummary: ICategoryItemSummary,
  ): Promise<ICategory> {
    return this.categoriesRepository.findByIdAndAddItem(id, itemSummary);
  }

  async findAndDeleteCategoryById(id: string): Promise<void> {
    const category = await this.categoriesRepository
      .findByIdAndDelete(id)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (!category) {
      throw new NotFoundException('Category Id is incorrect or not exist!');
    }
    return;
  }
}
