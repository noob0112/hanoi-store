import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './emails.service';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailUser } from '../users/entities';

describe('MailService', () => {
  let service: MailService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService, MailerService],
    })
      .overrideProvider(MailerService)
      .useValue(mockMailerService)
      .compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendUserConfirmation', () => {
    it('should send email for user', async () => {
      const user: IMailUser = {
        email: 'test@email.com',
        fullName: 'test',
      };
      const token = 'token';

      await service.sendUserConfirmation(user, token);

      expect(mockMailerService.sendMail).toHaveBeenCalled();
    });
  });
});
