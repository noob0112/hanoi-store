import { objectId } from '../types';

export interface IFlashSaleSummary {
  flashSaleId: objectId | string;
  startTime: Date;
  endTime: Date;
  priceBeforeDiscount: number;
  stockFlashSale?: number;
}
