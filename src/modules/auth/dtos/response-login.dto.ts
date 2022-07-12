import { ApiProperty } from '@nestjs/swagger';
import { UserSummary } from './user-summary.dto';

export class ResponseLoginDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserSummary;
}
