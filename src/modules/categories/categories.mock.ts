import { STATUS_CATEGORY_ENUM } from './categories.constant';
import { StatusCategoryDto } from './dtos';
import {
  ICategory,
  ICategoryItemSummary,
  INewCategory,
  IUpdateCategory,
} from './entities';

export const mockCategoryId = 'test';

export const mockCategory: ICategory = {
  _id: 'test',
  name: 'test',
  status: STATUS_CATEGORY_ENUM.ACTIVE,
  listItems: [
    {
      itemId: 'test',
      itemName: '',
      barCode: '1',
      price: 1,
      avatarImage: 'test',
      stock: 1,
      historicalSold: 1,
    },
  ],
  banner: 'test',
  field: 1,
};

export let mockCategoryStatus: StatusCategoryDto;

export let mockCategoryItemSummary: ICategoryItemSummary;

export let mockUpdateCategory: IUpdateCategory;

export let mockNewCategory: INewCategory;
