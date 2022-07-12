import { ICategorySummary } from 'src/common/entities';

export interface INewItem {
  name: string;
  barCode: string;
  cost: number;
  price: number;
  weight: number;
  avataImage: string;
  detailImage?: string[];
  description?: string;
  stock: number;
  category: ICategorySummary;
}
