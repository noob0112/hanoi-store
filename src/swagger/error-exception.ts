import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  static message: string;

  constructor(message?: string) {
    this.message = message;
  }

  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty({ default: BadRequestResponse.message })
  message: string;

  @ApiProperty({ default: 'Bad request' })
  error: string;
}

export class NotFoundResponse {
  @ApiProperty({ default: HttpStatus.NOT_FOUND })
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty({ default: 'Not found' })
  error: string;
}

export class UnauthorizedResponse {
  @ApiProperty({ default: HttpStatus.UNAUTHORIZED })
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty({ default: 'Unauthorized' })
  error: string;
}

export class ForbiddenResponse {
  @ApiProperty({ default: HttpStatus.FORBIDDEN })
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty({ default: 'Forbidden' })
  error: string;
}

export class ConflicResponse {
  @ApiProperty({ default: HttpStatus.CONFLICT })
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty({ default: 'Conflic' })
  error: string;
}

export class InternalServerErrorResponse {
  @ApiProperty({ default: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty({ default: 'Internal Server Error' })
  error: string;
}
