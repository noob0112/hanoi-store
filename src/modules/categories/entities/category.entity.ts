import { objectId } from 'src/common/types';
import { STATUS_CATEGORY_ENUM } from '../categories.constant';

import { ICategoryItemSummary } from './category-item-summary.entity';
export interface ICategory {
  _id: objectId | string;
  name: string;
  status: STATUS_CATEGORY_ENUM;
  listItems: ICategoryItemSummary[];
  banner: string;
  field: number;
}
