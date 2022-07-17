import { IUser } from '../users/entities';
import { ROLE_ENUM, USER_STATUS_ENUM } from '../users/users.constant';
import { INewOrder, IOrder } from './entities';

export const mockUser: IUser = {
  _id: '',
  role: ROLE_ENUM.USER,
  status: USER_STATUS_ENUM.PENDING,
  userName: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  address: '',
};

export const mockNewOrder: INewOrder = {
  listItems: [
    {
      itemId: 'string',
      quantity: 1,
    },
  ],
  voucherId: 'voucher',
};

export const mockNewOrderNoVoucher: INewOrder = {
  listItems: [
    {
      itemId: 'string',
      quantity: 1,
    },
  ],
};

export const mockOrder: IOrder = {
  user: undefined,
  listItems: [],
  originPrice: 0,
  totalPrice: 0,
};
