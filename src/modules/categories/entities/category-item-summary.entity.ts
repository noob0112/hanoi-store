import { IFlashSaleSummary, IItemSummary } from 'src/common/entities';

export interface ICategoryItemSummary extends IItemSummary {
  flashSale?: IFlashSaleSummary;
}
