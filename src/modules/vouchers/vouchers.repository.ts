import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { EntityRepository } from '../../database';
import { VoucherDocument } from './schema';

@Injectable()
export class VouchersRepository extends EntityRepository<VoucherDocument> {
  constructor(
    @InjectModel('Voucher')
    private readonly voucherModel: Model<VoucherDocument>,
  ) {
    super(voucherModel);
  }

  findOneAndUpdateCustom(voucherId, updateVoucher) {
    return this.voucherModel
      .findByIdAndUpdate(
        voucherId,
        {
          $set: updateVoucher,
        },
        {
          new: true,
        },
      )
      .then((voucher) => {
        if (!voucher) {
          throw new NotFoundException(
            'Voucher Id is incorrect or not existed!',
          );
        }

        return voucher;
      });
  }

  findVoucherByIdAndUpdate(
    id: string,
    updateVoucher: unknown,
    options: unknown = { new: true },
    session: ClientSession | null = null,
  ) {
    return this.entityModel
      .findByIdAndUpdate(id, updateVoucher, options)
      .session(session);
  }
}
