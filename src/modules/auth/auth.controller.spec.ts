import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { mockSignUp, mockSignUpResponse } from './auth.mock';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signUp: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user and return true', async () => {
      mockAuthService.signUp.mockResolvedValue(true);

      const result = await controller.signUp(mockSignUp);

      expect(result).toBe(true);
    });
  });

  describe('Login', () => {
    it('[Expect-Success] should return true', async () => {
      mockAuthService.login.mockResolvedValue(true);

      const result = await controller.signUp(mockSignUp);

      expect(result).toBe(true);
    });
  });
});
