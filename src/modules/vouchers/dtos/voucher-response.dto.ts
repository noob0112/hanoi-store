import { ApiProperty } from '@nestjs/swagger';

export class VoucherResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  discount: number;
}
