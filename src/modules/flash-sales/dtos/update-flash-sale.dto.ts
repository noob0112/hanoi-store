import { PartialType } from '@nestjs/swagger';
import { NewFlashSaleDto } from './new-flash-sale.dto';

export class UpdateFlashSaleDto extends PartialType(NewFlashSaleDto) {}
