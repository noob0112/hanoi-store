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
import { ApiTags } from '@nestjs/swagger';
import { NewFileDetailDto } from './dtos';
import { UploadService } from './upload.service';

@ApiTags('auth')
@Controller('upload')
export class UploadController {
  constructor(readonly uploadService: UploadService) {}

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
