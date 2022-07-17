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
      if (error.keyPattern && Object.keys(error.keyPattern)[0] === 'name')
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

  findListCategories(): Promise<ICategory[]> {
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
    const select = {};
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

  updateCategoryItem(categoryId: string, itemSummary: ICategoryItemSummary) {
    return this.categoriesRepository.updateOne(
      { _id: categoryId, 'listItems.itemId': itemSummary.itemId },
      { $set: { 'listItems.$': itemSummary } },
      { fields: { 'listItems.$': 1 }, new: true },
    );
  }

  async findAndDeleteCategoryById(categoryId: string): Promise<void> {
    const categoryFind = await this.categoriesRepository.findById(categoryId);

    if (!categoryFind) {
      throw new NotFoundException('Category Id is incorrect or not exist!');
    }

    if (categoryFind.listItems.length !== 0) {
      throw new BadRequestException(
        'You can not delete category when has item',
      );
    }

    await this.categoriesRepository
      .findByIdAndDelete(categoryId)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    return;
  }
}
