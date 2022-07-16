import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsOptional()
  @IsUrl()
  banner?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  field?: number;
}
