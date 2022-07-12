export interface INewVoucher {
  code: string;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  quantity: number;
  discount: number;
}
