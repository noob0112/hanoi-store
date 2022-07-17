import { IItemSummary } from './flash-sale-item-summary.entity';

export interface IFlashSaleItem {
  item: IItemSummary;
  priceBeforeDiscount: number;
  stockFlashSale: number;
}
