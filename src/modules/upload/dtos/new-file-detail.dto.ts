import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { BUCKETPATH_ENUM } from '../upload.constants';

export class NewFileDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BUCKETPATH_ENUM)
  bucketPath: BUCKETPATH_ENUM;
}
