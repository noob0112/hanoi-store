import { Test, TestingModule } from '@nestjs/testing';
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
      jest.mock('aws-sdk', () => {
        return {
          upload: jest.fn().mockReturnThis().mockResolvedValue(mockUploadS3),
          promise: jest.fn().mockReturnValueOnce({ Bucket: 'TestBucketName' }),
        };
      });
      // const s3 = new S3(mockBodyS3);

      // let testS3;
      // beforeEach(() => {
      //   testS3 = new S3();
      //   testS3.promise.mockReturnValueOnce({ Bucket: 'TestBucketName' });
      // });

      const result = await service.upload(
        mockFile,
        BUCKETPATH_ENUM['CATEGORY-IMAGE'],
      );

      expect(result).toEqual(mockUploadS3);
    });
  });
});
