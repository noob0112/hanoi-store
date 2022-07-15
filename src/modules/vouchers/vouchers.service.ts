import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      if (Object.keys(error.keyPattern)[0])
        throw new BadRequestException('Code of voucher is existed!');
      throw new InternalServerErrorException(error.message);
    });
  }

  async findVoucherById(voucherId: string): Promise<IVoucher> {
    const voucher = await this.vouchersRepository
      .findById(voucherId)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    if (!voucher) {
      throw new NotFoundException('Voucher does not exist!');
    }

    return voucher;
  }

  findListVoucher(query: IQueryVoucher): Promise<IVoucher[]> {
    const options = {
      limit: VOUCHER_OPTIONS_ENUM.LIMIT,
      skip: VOUCHER_OPTIONS_ENUM.LIMIT * ((query.page - 1) | 0),
    };

    return this.vouchersRepository.find({}, {}, options);
  }

  async findVoucherByIdAndUpdate(
    voucherId: string,
    updateVoucher: IUpdateVoucher,
  ): Promise<IVoucher> {
    return this.vouchersRepository.findOneAndUpdateCustom(
      voucherId,
      updateVoucher,
    );
  }

  async findVoucherByIdAndUpdateQuatity(
    voucherId: string | objectId,
  ): Promise<IVoucher> {
    const voucher = await this.vouchersRepository
      .findByIdAndUpdate(voucherId, {
        $inc: { quantity: -1 },
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    if (!voucher) {
      throw new NotFoundException('voucher does not exist!');
    }

    return voucher;
  }

  async findVoucherByIdAndDelete(voucherId: string): Promise<boolean | void> {
    await this.vouchersRepository
      .findByIdAndDelete(voucherId)
      .then((voucher) => {
        if (voucher) return true;
        throw new NotFoundException('Voucher Id is incorrect or not existed!');
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    return;
  }
}
