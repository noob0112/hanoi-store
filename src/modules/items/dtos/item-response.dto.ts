import { ApiProperty } from '@nestjs/swagger';

export class ItemCategory {
  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  categoryName: string;
}

export class ItemResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  barCode: string;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  avataImage: string;

  @ApiProperty()
  detailImage?: string[];

  @ApiProperty()
  description?: string;

  @ApiProperty()
  stock: number;

  @ApiProperty({ type: ItemCategory })
  category: ItemCategory;

  @ApiProperty()
  historicalSold: number;

  @ApiProperty()
  countOfSelling: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
