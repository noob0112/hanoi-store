import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { mockError, mockNewUser, mockUser } from './users.mock';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('[Expect-Success] should create a new user', async () => {
      mockUsersRepository.create.mockResolvedValue(mockUser);

      const result = await service.create(mockNewUser);

      expect(result).toEqual(mockUser);
    });

    it('[Expect-fails] userName is existed!', async () => {
      mockUsersRepository.create.mockRejectedValue({
        keyPattern: { userName: 1 },
      });
      try {
        await service.create(mockNewUser);
      } catch (error) {
        expect(error.message).toEqual('userName is existed!');
      }
    });

    it('[Expect-fails] email is existed!', async () => {
      mockUsersRepository.create.mockRejectedValue({
        keyPattern: { email: 1 },
      });
      try {
        await service.create(mockNewUser);
      } catch (error) {
        expect(error.message).toEqual('email is existed!');
      }
    });

    it('[Expect-fails] phoneNumber is existed!', async () => {
      mockUsersRepository.create.mockRejectedValue({
        keyPattern: { phoneNumber: 1 },
      });
      try {
        await service.create(mockNewUser);
      } catch (error) {
        expect(error.message).toEqual('phoneNumber is existed!');
      }
    });

    it('[Expect-fails] Error other', async () => {
      mockUsersRepository.create.mockRejectedValue(mockError);
      try {
        await service.create(mockNewUser);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findOneByUserName', () => {
    it('[Expect-Success] should return a user', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOneByUserName(mockUser.userName);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByIdAndUpdateStatus', () => {
    it('[Expect-Success] should update status user', async () => {
      mockUsersRepository.findByIdAndUpdate.mockResolvedValue(mockUser);

      const result = await service.findByIdAndUpdateStatus(
        mockUser._id,
        mockUser.status,
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('findUserById', () => {
    it('[Expect-Success] should update status user', async () => {
      mockUsersRepository.findById.mockResolvedValue(mockUser);

      const result = await service.findUserById(mockUser._id);
      expect(result).toEqual(mockUser);
    });
  });
});
