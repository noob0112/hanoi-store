import { INewVoucher } from './new-voucher.entity';

export interface IVoucher extends INewVoucher {
  _id: string;
}
