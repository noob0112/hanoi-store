import { STATUS_CATEGORY_ENUM } from '../categories.constant';

export interface IUpdateCategory {
  status?: STATUS_CATEGORY_ENUM;
  listItems?: [];
  banner?: string;
  field?: number;
}
