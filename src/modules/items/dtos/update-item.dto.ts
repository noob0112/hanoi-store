import { PartialType } from '@nestjs/swagger';
import { NewItemDto } from './new-item.dto';

export class UpdateItemDto extends PartialType(NewItemDto) {}
