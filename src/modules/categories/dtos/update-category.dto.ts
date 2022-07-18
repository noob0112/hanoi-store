import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUrl } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsOptional()
  @IsUrl()
  banner?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  field?: number;
}
