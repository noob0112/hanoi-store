import { ICategorySummary, IFlashSaleSummary } from 'src/common/entities';
import { objectId } from 'src/common/types';

export interface IOrderItemSummary {
  itemId: objectId | string;
  itemName?: string;
  barCode?: string;
  price?: number;
  avatarImage?: string;
  flashSale?: IFlashSaleSummary;
  category?: ICategorySummary;
}
