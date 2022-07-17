import { IItem } from '../items/entities';
import {
  IFlashSale,
  IFlashSaleAddItem,
  INewFlashSale,
  IUpdateFlashSale,
} from './entities';

export const mockNewFlashSale: INewFlashSale = {
  name: 'name',
  startTime: undefined,
  endTime: undefined,
};

export const mockFlashSale: IFlashSale = {
  _id: 'id',
  name: 'name',
  startTime: undefined,
  endTime: undefined,
  isOnGoing: false,
  listItems: [
    {
      item: {
        itemId: '',
        itemName: '',
        category: { categoryId: '', categoryName: '' },
        barCode: '',
        price: 1,
        avatarImage: '',
        stock: 1,
        historicalSold: 1,
      },
      priceBeforeDiscount: 1,
      stockFlashSale: 1,
    },
  ],
};

export const mockNewFlashSaleItem: IFlashSaleAddItem = {
  itemId: '',
  priceBeforeDiscount: 0,
  stockFlashSale: 0,
};

export const mockUpdateFlashSale: IUpdateFlashSale = {};

export const mockError = {
  message: 'error message',
};

export const mockQuantity = 1;

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
  stock: 0,
  category: undefined,
};
