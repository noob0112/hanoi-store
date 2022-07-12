import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CategorySummaryDto } from 'src/common/dtos';

export class NewItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  barCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avataImage: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  detailImage?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ValidateNested({ each: true })
  @Type(() => CategorySummaryDto)
  @ApiProperty()
  @IsNotEmpty()
  category: CategorySummaryDto;
}
