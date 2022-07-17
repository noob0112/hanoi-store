import { NewItemDto, UpdateItemDto } from './dtos';
import { IItem } from './entities';

export const mockError = {
  message: 'message error',
};

export const mockItem: IItem = {
  _id: '',
  historicalSold: 0,
  countOfSelling: 0,
  name: '',
  barCode: '',
  cost: 0,
  price: 0,
  weight: 0,
  avataImage: '',
  stock: 1,
  category: {
    categoryId: '',
  },
};

export const mockNewItem: NewItemDto = {
  name: '',
  barCode: '',
  cost: 0,
  price: 0,
  weight: 0,
  avataImage: '',
  stock: 0,
  category: {
    categoryId: '',
  },
};

export const mockUpdateItem: UpdateItemDto = {};
