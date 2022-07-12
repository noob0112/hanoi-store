import { ICategorySummary, IFlashSaleSummary } from 'src/common/entities';

export interface IItem {
  _id: string;
  name: string;
  barCode: string;
  cost: number;
  price: number;
  weight: number;
  avataImage: string;
  detailImage: string[];
  description: string;
  flashSale?: IFlashSaleSummary;
  stock: number;
  historicalSold: number;
  category: ICategorySummary;
  countOfSelling: number;
}
