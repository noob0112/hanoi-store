import { ICategorySummary, IItemSummary } from 'src/common/entities';

export interface IFlashSaleItemSummary extends IItemSummary {
  category: ICategorySummary;
}
