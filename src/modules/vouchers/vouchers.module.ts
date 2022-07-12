import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VoucherSchema } from './schema';
import { VouchersController } from './vouchers.controller';
import { VouchersRepository } from './vouchers.repository';
import { VouchersService } from './vouchers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Voucher',
        schema: VoucherSchema,
      },
    ]),
  ],
  controllers: [VouchersController],
  providers: [VouchersService, VouchersRepository],
  exports: [VouchersService],
})
export class VouchersModule {}
