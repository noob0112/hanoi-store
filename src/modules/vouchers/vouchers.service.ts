import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

import { VouchersRepository } from './vouchers.repository';
import {
  INewVoucher,
  IVoucher,
  IUpdateVoucher,
  IQueryVoucher,
} from './entities';
import { VOUCHER_OPTIONS_ENUM } from './vouchers.constant';
import { objectId } from 'src/common/types';

@Injectable()
export class VouchersService {
  constructor(readonly vouchersRepository: VouchersRepository) {}

  async createVoucher(newVoucher: INewVoucher): Promise<IVoucher> {
    return await this.vouchersRepository.create(newVoucher).catch((error) => {
      if (error.keyPattern && Object.keys(error.keyPattern)[0])
        throw new BadRequestException('Code of voucher is existed!');
      throw new InternalServerErrorException(error.message);
    });
  }

  findListVoucher(query?: IQueryVoucher): Promise<IVoucher[]> {
    const options = {
      limit: VOUCHER_OPTIONS_ENUM.LIMIT,
      skip: VOUCHER_OPTIONS_ENUM.LIMIT * ((query?.page - 1) | 0),
    };

    return this.vouchersRepository.find({}, {}, options).catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  async findVoucherById(voucherId: string): Promise<IVoucher> {
    const voucher = await this.vouchersRepository
      .findById(voucherId)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (!voucher) {
      throw new NotFoundException('Voucher does not exist!');
    }

    return voucher;
  }

  async findVoucherByIdAndUpdate(
    voucherId: string,
    updateVoucher: IUpdateVoucher,
  ): Promise<IVoucher> {
    return this.vouchersRepository
      .findOneAndUpdateCustom(voucherId, updateVoucher)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  async findVoucherByIdAndUpdateQuantity(
    voucherId: string | objectId,
    session: mongoose.ClientSession | null = null,
  ): Promise<IVoucher> {
    const voucher = await this.vouchersRepository
      .findByIdAndUpdate(
        voucherId,
        {
          $inc: { quantity: -1 },
        },
        { session: session },
      )
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    if (!voucher) {
      throw new NotFoundException('voucher does not exist!');
    }

    return voucher;
  }

  async findVoucherByIdAndDelete(voucherId: string): Promise<boolean | void> {
    const voucher = await this.vouchersRepository
      .findByIdAndDelete(voucherId)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    if (!voucher) {
      throw new NotFoundException('Voucher Id is incorrect or not existed!');
    }

    return;
  }
}
