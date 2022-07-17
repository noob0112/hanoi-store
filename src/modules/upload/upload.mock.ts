export const mockFile = {
  fieldname: 'fieldname',
  originalname: 'originalname',
  encoding: 'encoding',
  mimetype: 'mimetype',
  buffer: new Buffer('string'),
  size: 3392,
} as unknown as Express.Multer.File;

export const mockUploadS3 = {
  params: 'param',
  key: 'key',
  publicUrl: 'publicUrl',
};

export const mockBodyS3 = {
  endpoint: 'endpoint',
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
};
