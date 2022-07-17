import { ICategorySummary } from '../../../common/entities';

export interface IItemSummary {
  itemId: string;
  itemName: string;
  barCode: string;
  price: number;
  avataImage: string;
  stock: number;
  historicalSold: number;
  category: ICategorySummary;
}
