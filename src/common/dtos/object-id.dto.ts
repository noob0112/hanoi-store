import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ObjectIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id: string;
}
