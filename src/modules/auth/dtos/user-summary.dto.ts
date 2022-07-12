import { ApiProperty } from '@nestjs/swagger';

export class UserSummary {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;
}
