import { INewVoucher, IUpdateVoucher, IVoucher } from './entities';

export const mockError = {
  message: 'error message',
};

export const mockNewVoucher: INewVoucher = {
  code: 'code',
  name: 'name',
  description: 'description',
  startTime: undefined,
  endTime: undefined,
  quantity: 10,
  discount: 10,
};

export const mockVoucher: IVoucher = {
  _id: '',
  code: '',
  name: '',
  description: '',
  startTime: undefined,
  endTime: undefined,
  quantity: 0,
  discount: 0,
};

export const mockUpdateVoucher: IUpdateVoucher = {};
