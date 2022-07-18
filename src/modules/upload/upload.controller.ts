import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  // FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
} from '../../swagger/error-exception';
import { Roles } from '../auth/decorator/roles.decorator';
import { ROLE_ENUM } from '../users/users.constant';
import { NewFileDetailDto } from './dtos';
import { BUCKETPATH_ENUM } from './upload.constants';
import { UploadService } from './upload.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(readonly uploadService: UploadService) {}

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: '[ADMIN] Upload file' })
  @ApiCreatedResponse({ description: 'upload file successfully' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorResponse,
  })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        bucketPath: {
          enum: [
            BUCKETPATH_ENUM['CATEGORY-IMAGE'],
            BUCKETPATH_ENUM['ITEM-IMAGE'],
          ],
        },
      },
    },
  })
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileDetail: NewFileDetailDto,
  ) {
    return await this.uploadService.upload(file, fileDetail.bucketPath);
  }

  // @Post('/')
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 2 }]))
  // async upload(
  //   @UploadedFiles() file: Array<Express.Multer.File>,
  //   @Body() body,
  // ) {
  //   return await this.uploadService.upload(file['file'][0]);
  // }
}
