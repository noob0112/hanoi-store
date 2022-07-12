export interface IUpdateVoucher {
  code?: string;
  name?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  quantity?: number;
  discount?: number;
}
