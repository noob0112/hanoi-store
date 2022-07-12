import { ICategorySummary } from 'src/common/entities';
import { FlashSaleSummary } from 'src/common/schemas';

export interface IUpdateItem {
  name?: string;
  barCode?: string;
  cost?: number;
  price?: number;
  weight?: number;
  avataImage?: string;
  detailImage?: string[];
  description?: string;
  flashSale?: FlashSaleSummary;
  stock?: number;
  category?: ICategorySummary;
}
