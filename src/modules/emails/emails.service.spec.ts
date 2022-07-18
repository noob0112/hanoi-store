import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './emails.service';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailUser } from '../users/entities';

describe('MailService', () => {
  let service: EmailService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, MailerService],
    })
      .overrideProvider(MailerService)
      .useValue(mockMailerService)
      .compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendUserConfirmation', () => {
    it('[Expect-Success] should send email for user', async () => {
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
