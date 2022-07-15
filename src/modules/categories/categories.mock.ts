import { STATUS_CATEGORY_ENUM } from './categories.constant';
import { StatusCategoryDto } from './dtos';
import {
  ICategory,
  ICategoryItemSummary,
  INewCategory,
  IUpdateCategory,
} from './entities';

export const mockError = {
  message: 'error message',
  // index: 0,
  // code: 11000,
  // keyPattern: { name: 1 },
  // keyValue: { name: 'smart-phone' },
};

export const mockCategoryId = 'test';

export const mockDeleteCategory = {
  listItems: [],
};

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

export const mockCategoryItemSummary: ICategoryItemSummary = {
  itemId: '',
  itemName: '',
  barCode: '',
  price: 0,
  avatarImage: '',
  stock: 0,
  historicalSold: 0,
};

export let mockUpdateCategory: IUpdateCategory;

export let mockNewCategory: INewCategory;
