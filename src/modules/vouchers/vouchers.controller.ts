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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  ForbiddenResponse,
  UnauthorizedResponse,
} from '../../swagger/error-exception';

import { ObjectIdDto } from '../../common/dtos';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
// import { VerifyGuard } from '../auth/guards/verify.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { NewVoucherDto, QueryVoucherDto, UpdateVoucherDto } from './dtos';
import { VoucherResponse } from './dtos/voucher-response.dto';
import { IVoucher } from './entities';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
@ApiTags('vouchers')
export class VouchersController {
  constructor(readonly vouchersService: VouchersService) {}

  // Create Voucher
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Create voucher' })
  @ApiCreatedResponse({
    description: 'Create voucher successfully.',
    type: VoucherResponse,
  })
  @ApiBadRequestResponse({
    description: 'Create voucher error!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiInternalServerErrorResponse({
    description: 'Create voucher error!',
    type: BadRequestResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Post()
  async createVoucher(@Body() voucher: NewVoucherDto): Promise<IVoucher> {
    return await this.vouchersService.createVoucher(voucher);
  }

  // Find list vouchers
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Find list vouchers' })
  @ApiOkResponse({
    description: 'Find list vouchers successfully.',
    type: [VoucherResponse],
  })
  @ApiBadRequestResponse({
    description: 'Find list vouchers error!',
    type: BadRequestResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Find list vouchers error!',
    type: BadRequestResponse,
  })
  @Get()
  async findListVoucher(@Query() query?: QueryVoucherDto): Promise<IVoucher[]> {
    return await this.vouchersService.findListVoucher(query);
  }

  // Find voucher by id
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Find voucher by id' })
  @ApiOkResponse({
    description: 'Find voucher successfully.',
    type: [VoucherResponse],
  })
  @ApiBadRequestResponse({
    description: 'Find voucher error!',
    type: BadRequestResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Find voucher error!',
    type: BadRequestResponse,
  })
  @Get('/:id')
  async findVoucherById(@Param() param: ObjectIdDto): Promise<IVoucher> {
    return await this.vouchersService.findVoucherById(param.id);
  }

  // Update Voucher by id
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Update voucher by id' })
  @ApiOkResponse({
    description: 'Update voucher successfully.',
    type: VoucherResponse,
  })
  @ApiBadRequestResponse({
    description: 'Update voucher error!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiInternalServerErrorResponse({
    description: 'Update voucher error!',
    type: BadRequestResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
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

  // Delete Voucher by id
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Delete Voucher by id' })
  @ApiNoContentResponse({
    description: 'Delete voucher successfully.',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Delete voucher error!',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiInternalServerErrorResponse({
    description: 'Delete voucher error!',
    type: BadRequestResponse,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':id')
  async findVoucherByIdAndDelete(@Param() param: ObjectIdDto) {
    return await this.vouchersService.findVoucherByIdAndDelete(param.id);
  }
}
