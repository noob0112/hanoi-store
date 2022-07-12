import { objectId } from '../types';

export interface IItemSummary {
  itemId: objectId | string;
  itemName: string;
  barCode: string;
  price: number;
  priceBeforeDiscount?: number;
  avatarImage: string;
  stock: number;
  historicalSold: number;
}
