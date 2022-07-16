import { Test, TestingModule } from '@nestjs/testing';
import { mockObjectIdDto } from '../../common/mocks';
import { VouchersController } from './vouchers.controller';
import {
  mockNewVoucher,
  mockUpdateVoucher,
  mockVoucher,
} from './vouchers.mock';
import { VouchersService } from './vouchers.service';

describe('VouchersController', () => {
  let controller: VouchersController;

  const mockVouchersService = {
    createVoucher: jest.fn(),
    findListVoucher: jest.fn(),
    findVoucherById: jest.fn(),
    findVoucherByIdAndUpdate: jest.fn(),
    findVoucherByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VouchersController],
      providers: [VouchersService],
    })
      .overrideProvider(VouchersService)
      .useValue(mockVouchersService)
      .compile();

    controller = module.get<VouchersController>(VouchersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createVoucher', () => {
    it('[Expect-Success] should create a voucher', async () => {
      mockVouchersService.createVoucher.mockResolvedValue(mockVoucher);

      const result = await controller.createVoucher(mockNewVoucher);

      expect(result).toEqual(mockVoucher);
    });
  });

  describe('findAllCategories', () => {
    it('[Expect-Success] should return list vouchers', async () => {
      mockVouchersService.findListVoucher.mockResolvedValue([mockVoucher]);

      const result = await controller.findListVoucher();

      expect(result).toEqual([mockVoucher]);
    });
  });

  describe('findVoucherById', () => {
    it('[Expect-Success] should return a voucher', async () => {
      mockVouchersService.findVoucherById.mockResolvedValue(mockVoucher);

      const result = await controller.findVoucherById(mockObjectIdDto);

      expect(result).toEqual(mockVoucher);
    });
  });

  describe('findVoucherByIdAndUpdate', () => {
    it('[Expect-Success] should return a category before update', async () => {
      mockVouchersService.findVoucherByIdAndUpdate.mockResolvedValue(
        mockVoucher,
      );

      const result = await controller.findVoucherByIdAndUpdate(
        mockObjectIdDto,
        mockUpdateVoucher,
      );

      expect(result).toEqual(mockVoucher);
    });
  });

  describe('findVoucherByIdAndDelete', () => {
    it('[Expect-Success] should create a category', async () => {
      mockVouchersService.findVoucherByIdAndDelete.mockResolvedValue(
        mockVoucher,
      );

      const result = await controller.findVoucherByIdAndDelete(mockObjectIdDto);

      expect(result).toReturn;
    });
  });
});
