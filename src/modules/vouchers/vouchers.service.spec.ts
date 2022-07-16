import { Test, TestingModule } from '@nestjs/testing';
import {
  mockError,
  mockNewVoucher,
  mockUpdateVoucher,
  mockVoucher,
} from './vouchers.mock';
import { VouchersRepository } from './vouchers.repository';
import { VouchersService } from './vouchers.service';

describe('VouchersService', () => {
  let service: VouchersService;

  const mockVouchersRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOneAndUpdateCustom: jest.fn(),
    findByIdAndAddItem: jest.fn(),
    findByIdAndDelete: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VouchersService, VouchersRepository],
    })
      .overrideProvider(VouchersRepository)
      .useValue(mockVouchersRepository)
      .compile();

    service = module.get<VouchersService>(VouchersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createVoucher', () => {
    it('[Expect-Success] should create a voucher', async () => {
      mockVouchersRepository.create.mockResolvedValue(mockVoucher);

      const result = await service.createVoucher(mockNewVoucher);

      expect(result).toEqual(mockVoucher);
    });

    it('[Expect-fails] category is existed', async () => {
      mockVouchersRepository.create.mockRejectedValue({
        keyPattern: { code: 1 },
      });

      try {
        await service.createVoucher(mockNewVoucher);
      } catch (error) {
        expect(error.message).toEqual('Code of voucher is existed!');
      }
    });

    it('[Expect-fails] Error orther', async () => {
      mockVouchersRepository.create.mockRejectedValue(mockError);
      try {
        await service.createVoucher(mockNewVoucher);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findListVoucher', () => {
    it('[Expect-Success] should return a list vouchers', async () => {
      mockVouchersRepository.find.mockResolvedValue([mockVoucher]);

      const result = await service.findListVoucher();

      expect(result).toEqual([mockVoucher]);
    });

    it('[Expect-fails] Error orther', async () => {
      mockVouchersRepository.find.mockRejectedValue(mockError);
      try {
        await service.findListVoucher();
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findVoucherById', () => {
    it('[Expect-Success] should return a voucher', async () => {
      mockVouchersRepository.findById.mockResolvedValue(mockVoucher);

      const result = await service.findVoucherById(mockVoucher._id);

      expect(result).toEqual(mockVoucher);
    });

    it('[Expect-fails] Error orther', async () => {
      mockVouchersRepository.findById.mockRejectedValue(mockError);
      try {
        await service.findVoucherById(mockVoucher._id);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });

    it('[Expect-fails] voucher does not exist', async () => {
      mockVouchersRepository.findById.mockResolvedValue(undefined);
      await service.findVoucherById(mockVoucher._id).catch((error) => {
        expect(error.message).toEqual('Voucher does not exist!');
      });
    });
  });

  describe('findVoucherByIdAndUpdate', () => {
    it('[Expect-Success] should return a voucher', async () => {
      mockVouchersRepository.findOneAndUpdateCustom.mockResolvedValue(
        mockVoucher,
      );

      const result = await service.findVoucherByIdAndUpdate(
        mockVoucher._id,
        mockUpdateVoucher,
      );

      expect(result).toEqual(mockVoucher);
    });

    it('[Expect-fails] Error orther', async () => {
      mockVouchersRepository.findOneAndUpdateCustom.mockRejectedValue(
        mockError,
      );
      try {
        await service.findVoucherByIdAndUpdate(
          mockVoucher._id,
          mockUpdateVoucher,
        );
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findVoucherByIdAndUpdateQuantity', () => {
    it('[Expect-Success] update quantity', async () => {
      mockVouchersRepository.findByIdAndUpdate.mockResolvedValue(mockVoucher);

      const result = await service.findVoucherByIdAndUpdateQuantity(
        mockVoucher._id,
      );

      expect(result).toEqual(mockVoucher);
    });

    it('[Expect-fails] Error orther', async () => {
      mockVouchersRepository.findByIdAndUpdate.mockRejectedValue(mockError);
      try {
        await service.findVoucherByIdAndUpdateQuantity(mockVoucher._id);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });

    it('[Expect-fails] Voucher does not exist', async () => {
      mockVouchersRepository.findByIdAndUpdate.mockResolvedValue(undefined);
      try {
        await service.findVoucherByIdAndUpdateQuantity(mockVoucher._id);
      } catch (error) {
        expect(error.message).toEqual('voucher does not exist!');
      }
    });
  });

  describe('findVoucherByIdAndDelete', () => {
    it('[Expect-Success] delete voucher', async () => {
      mockVouchersRepository.findByIdAndDelete.mockResolvedValue(mockVoucher);

      expect(service.findVoucherByIdAndDelete(mockVoucher._id)).toReturn;
    });

    it('[Expect-fails] Error orther', async () => {
      mockVouchersRepository.findByIdAndDelete.mockRejectedValue(mockError);
      try {
        await service.findVoucherByIdAndDelete(mockVoucher._id);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });

    it('[Expect-fails] Voucher does not exist', async () => {
      mockVouchersRepository.findByIdAndDelete.mockResolvedValue(undefined);
      try {
        await service.findVoucherByIdAndDelete(mockVoucher._id);
      } catch (error) {
        expect(error.message).toEqual(
          'Voucher Id is incorrect or not existed!',
        );
      }
    });
  });
});
