import { IFlashSaleSummary } from 'src/common/entities';
import { INewItem } from '.';

export interface IItem extends INewItem {
  _id: string;
  flashSale?: IFlashSaleSummary;
  historicalSold: number;
  countOfSelling: number;
  createdAt?: Date;
  updatedAt?: Date;
}
