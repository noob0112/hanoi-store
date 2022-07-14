import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { AES } from 'crypto-js';

import { AuthService } from './auth.service';
import { MailService } from '../emails/emails.service';
import { UsersService } from '../users/users.service';
import {
  mockLoginReturn,
  mockPass,
  mockSignUp,
  mockSignUpResponse,
  mockToken,
  mockUser,
  mockUserName,
  mockUserPending,
  mockUserTokenPending,
} from './auth.mock';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    create: jest.fn(),
    findOneByUserName: jest.fn(),
    findByIdAndUpdateStatus: jest.fn(),
  };

  const mockMailService = {
    sendUserConfirmation: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('User'),
          useValue: {},
        },
        AuthService,
        MailService,
        UsersService,
        JwtService,
      ],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(MailService)
      .useValue(mockMailService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('[Expect-Success] should return new user', async () => {
      AES.encrypt = jest.fn().mockResolvedValue('secret');

      mockUsersService.create.mockResolvedValue(mockSignUpResponse);
      mockMailService.sendUserConfirmation.mockResolvedValue(true);

      const result = await service.signUp(mockSignUp);

      expect(result).toEqual(true);
    });
  });

  describe('login', () => {
    it('[Expect-Success] should return accessToken and information user', async () => {
      AES.decrypt = jest.fn().mockReturnValue(mockPass);
      AES.decrypt.toString = jest.fn().mockReturnValue(mockPass);

      mockUsersService.findOneByUserName.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('accessToken');
      mockMailService.sendUserConfirmation.mockResolvedValue(true);

      const result = await service.login(mockUserName, mockPass);

      expect(result).toEqual(mockLoginReturn);
    });

    it('[Expect-Fails] UserName is incorecct', async () => {
      const userIncorecct = 'userIncorecct';

      AES.decrypt = jest.fn().mockReturnValue(mockPass);
      AES.decrypt.toString = jest.fn().mockReturnValue(mockPass);

      mockUsersService.findOneByUserName.mockResolvedValue(undefined);
      mockJwtService.sign.mockReturnValue('accessToken');

      const result = service.login(userIncorecct, mockPass);

      await expect(result).rejects.toEqual(
        new BadRequestException('userName or password is not correct!'),
      );
    });

    it('[Expect-Fails] Password is incorecct', async () => {
      const passIncorecct = 'passIncorecct';

      AES.decrypt = jest.fn().mockReturnValue(mockPass);
      AES.decrypt.toString = jest.fn().mockReturnValue(mockPass);

      mockUsersService.findOneByUserName.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('accessToken');

      const result = service.login(mockUserName, passIncorecct);

      await expect(result).rejects.toEqual(
        new BadRequestException('userName or password is not correct!'),
      );
    });

    it('[Expect-Fails] Not validate email', async () => {
      AES.decrypt = jest.fn().mockReturnValue(mockPass);
      AES.decrypt.toString = jest.fn().mockReturnValue(mockPass);

      mockUsersService.findOneByUserName.mockResolvedValue(mockUserPending);
      mockJwtService.sign.mockReturnValue('accessToken');

      const result = service.login(mockUserName, mockPass);

      await expect(result).rejects.toEqual(
        new UnauthorizedException(
          'You are not validate email. We are send you a email, please validate in 30 minute',
        ),
      );
    });
  });

  describe('confirmEmail', () => {
    it('[Expect-Success] send a mail', async () => {
      mockJwtService.verify.mockReturnValue(mockUserTokenPending);
      mockUsersService.findByIdAndUpdateStatus.mockResolvedValue(
        mockUserPending,
      );

      const result = await service.confirmEmail(mockToken);

      expect(result).toEqual(true);
    });
  });
});
