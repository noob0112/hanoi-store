import { ORDER_STATUS_ENUM } from '../orders.constant';
import { IOrderItem } from './order-item.entity';
import { IOrderVoucher } from './order-voucher.entity';

export interface IOrder {
  _id?: string;
  user?: object;
  listItems: IOrderItem[];
  voucher?: IOrderVoucher;
  originPrice?: number;
  totalPrice?: number;
  status?: ORDER_STATUS_ENUM;
}
