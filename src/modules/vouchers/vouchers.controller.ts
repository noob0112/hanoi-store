import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ObjectIdDto } from 'src/common/dtos';

import { Roles } from '../auth/decorator/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { VerifyGuard } from '../auth/guards/verify.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { NewVoucherDto, QueryVoucherDto, UpdateVoucherDto } from './dtos';
import { IVoucher } from './entities';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(readonly vouchersService: VouchersService) {}

  // @UseGuards(JwtGuard, VerifyGuard, RolesGuard)
  // @Roles(ROLE_ENUM.ADMIN)
  @Post()
  async createVoucher(@Body() voucher: NewVoucherDto): Promise<IVoucher> {
    return await this.vouchersService.createVoucher(voucher);
  }

  @Get()
  async findListVoucher(@Query() query: QueryVoucherDto): Promise<IVoucher[]> {
    return await this.vouchersService.findListVoucher(query);
  }

  @Get('/:id')
  async findVoucherById(@Param() param: ObjectIdDto): Promise<IVoucher> {
    return await this.vouchersService.findVoucherById(param.id);
  }

  @Put('/:id')
  async findVoucherByIdAndUpdate(
    @Param() param: ObjectIdDto,
    @Body() updateVoucher: UpdateVoucherDto,
  ) {
    return await this.vouchersService.findVoucherByIdAndUpdate(
      param.id,
      updateVoucher,
    );
  }

  @Delete(':id')
  async findVocherByIdAndDelete(@Param() param: ObjectIdDto) {
    return await this.vouchersService.findVoucherByIdAndDelete(param.id);
  }
}
