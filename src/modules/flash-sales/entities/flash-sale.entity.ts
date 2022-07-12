import { IFlashSaleItemSummary } from './flash-sale-item-summary.entity';

export interface IFlashSale {
  _id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  isOnGoing: boolean;
  listItems: IFlashSaleItemSummary[];
}
