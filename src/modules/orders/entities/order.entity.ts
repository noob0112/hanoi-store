import { ICategorySummary, IFlashSaleSummary } from '../../../common/entities';
import { objectId } from '../../../common/types';
import { ORDER_STATUS_ENUM } from '../orders.constant';

export interface IOrder {
  _id?: objectId | string;
  user: IOrderUser;
  listItems: IOrderItem[];
  voucher?: IOrderVoucher;
  originPrice: number;
  totalPrice: number;
  status?: ORDER_STATUS_ENUM;
}

interface IOrderUser {
  userId: objectId | string;
  phoneNumber: string;
  fullName: string;
  address: string;
}

interface IOrderItem {
  item: IOrderItemSummary;
  quantity: number;
}

interface IOrderItemSummary {
  itemId: objectId | string;
  itemName: string;
  barCode: string;
  price: number;
  avatarImage: string;
  flashSale?: IFlashSaleSummary;
  category?: ICategorySummary;
}

interface IOrderVoucher {
  voucherId: objectId | string;
  code: string;
  discount: number;
}
