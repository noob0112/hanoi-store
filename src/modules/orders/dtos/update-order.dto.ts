import { PartialType } from '@nestjs/swagger';
import { NewOrderDto } from './new-order.dto';

export class UpdateOrderDto extends PartialType(NewOrderDto) {}
