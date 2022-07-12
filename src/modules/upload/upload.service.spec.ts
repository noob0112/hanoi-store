import { Test, TestingModule } from '@nestjs/testing';
import { S3 } from 'aws-sdk';
import { BUCKETPATH_ENUM } from './upload.constants';
import { mockFile, mockUploadS3 } from './upload.mock';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upload', () => {
    it('[Expect-Success] return key and publicUrl', async () => {
      service.uploadS3 = jest.fn().mockReturnValue(mockUploadS3);

      const result = await service.upload(
        mockFile,
        BUCKETPATH_ENUM['ITEM-IMAGE'],
      );

      expect(result).toEqual(mockUploadS3);
    });
  });

  // describe('uploadS3', () => {
  //   it('[Expect-Success] return key and publicUrl', async () => {
  //     const file = {
  //       fieldname: 'fieldname',
  //       originalname: 'originalname',
  //       encoding: 'encoding',
  //       mimetype: 'mimetype',
  //       buffer: 'buffer',
  //       size: 3392,
  //     };

  //     const mockUploadS3 = {
  //       key: 'key',
  //       publicUrl: 'publicUrl',
  //     };

  //     service.getS3 = jest.fn();

  //     service.getS3 = jest.fn().mockImplementation(() => {
  //       return { upload: jest.fn().mockResolvedValue(mockUploadS3) };
  //     });

  //     const result = await service.uploadS3(file, file.originalname);

  //     expect(result).toEqual(mockUploadS3);
  //   });
  // });
});
