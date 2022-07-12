import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CategorySummaryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  categoryId: string;
}
