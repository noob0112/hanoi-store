import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { AES } from 'crypto-js';

import { AuthService } from './auth.service';
import { MailService } from '../emails/emails.service';
import { UsersService } from '../users/users.service';
import { mockSignUp, mockSignUpResponse } from './auth.mock';
import { ILogin } from './entities';
import { IUser } from '../users/entities';
import { ROLE_ENUM, STATUS_ENUM } from '../users/users.constant';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    create: jest.fn(),
    findOneByUserName: jest.fn(),
  };

  const mockMailService = {
    sendUserConfirmation: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
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

      const result = await service.signUp(mockSignUp);

      expect(result).toEqual(true);
    });
  });

  describe('login', () => {
    it('[Expect-Success] should return accessToken and information user', async () => {
      const userName = 'test';
      const pass = 'test';

      const user: IUser = {
        _id: '1',
        userName: 'test',
        fullName: 'test',
        email: 'test',
        phoneNumber: 'test',
        password: 'test',
        address: 'test',
        role: ROLE_ENUM.USER,
        status: STATUS_ENUM.PENDING,
      };

      const loginReturn: ILogin = {
        accessToken: 'accessToken',
        user: {
          _id: '1',
          fullName: 'test',
          email: 'test',
          address: 'test',
        },
      };

      AES.decrypt = jest.fn().mockReturnValue('test');

      AES.decrypt.toString = jest.fn().mockReturnValue('test');

      mockUsersService.findOneByUserName.mockResolvedValue(user);

      mockJwtService.sign.mockReturnValue('accessToken');

      const result = await service.login(userName, pass);

      expect(result).toEqual(loginReturn);
    });
  });
});
