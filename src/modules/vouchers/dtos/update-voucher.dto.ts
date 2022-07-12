import { PartialType } from '@nestjs/swagger';
import { NewVoucherDto } from './new-voucher.dto';

export class UpdateVoucherDto extends PartialType(NewVoucherDto) {}
