// import { IFlashSaleItemSummary } from './flash-sale-item-summary.entity';

import { ICategorySummary, IItemSummary } from 'src/common/entities';

export interface IFlashSale {
  _id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  isOnGoing: boolean;
  listItems?: IFlashSaleItem[];
}

interface IFlashSaleItem {
  item: IFlashSaleItemSummary;
  priceBeforeDiscount: number;
  stockFlashSale: number;
}

interface IFlashSaleItemSummary extends IItemSummary {
  category: ICategorySummary;
}
