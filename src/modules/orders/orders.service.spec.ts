import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { CategoriesService } from '../categories/categories.service';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';
import { VouchersService } from '../vouchers/vouchers.service';
import {
  mockOrder,
  mockUser,
  mockNewOrder,
  mockNewOrderNoVoucher,
} from './orders.mock';
import { mockVoucher } from '../vouchers/vouchers.mock';
import { mockItem } from '../flash-sales/flash-sales.mock';
import { ORDER_STATUS_ENUM } from './orders.constant';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrdersRepository = {
    create: jest.fn(),
    findById: jest.fn(),
  };

  const mockUsersService = { findUserById: jest.fn() };

  const mockVouchersService = { findVoucherByIdAndUpdateQuantity: jest.fn() };

  const mockItemsService = { findItemByIdAndUpdateStock: jest.fn() };

  const mockCategoriesService = {};

  const mockFlashSalesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        OrdersRepository,
        CategoriesService,
        FlashSalesService,
        ItemsService,
        UsersService,
        VouchersService,
      ],
    })
      .overrideProvider(OrdersRepository)
      .useValue(mockOrdersRepository)
      .overrideProvider(CategoriesService)
      .useValue(mockCategoriesService)
      .overrideProvider(FlashSalesService)
      .useValue(mockFlashSalesService)
      .overrideProvider(ItemsService)
      .useValue(mockItemsService)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(VouchersService)
      .useValue(mockVouchersService)
      .compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('[Expect-Success] should create a order', async () => {
      mockUsersService.findUserById.mockResolvedValue(mockUser);

      mockVouchersService.findVoucherByIdAndUpdateQuantity.mockResolvedValue(
        mockVoucher,
      );

      mockItemsService.findItemByIdAndUpdateStock.mockResolvedValue(mockItem);

      mockOrdersRepository.create.mockResolvedValue(mockOrder);

      const result = await service.createOrder(mockNewOrder, mockUser._id);

      expect(result).toEqual(mockOrder);
    });

    it('[Expect-Success] should create a order', async () => {
      mockUsersService.findUserById.mockResolvedValue(mockUser);

      mockVouchersService.findVoucherByIdAndUpdateQuantity.mockResolvedValue(
        mockVoucher,
      );

      mockItemsService.findItemByIdAndUpdateStock.mockResolvedValue(mockItem);

      mockOrdersRepository.create.mockResolvedValue(mockOrder);

      const result = await service.createOrder(
        mockNewOrderNoVoucher,
        mockUser._id,
      );

      expect(result).toEqual(mockOrder);
    });

    // it('[Expect-fails] Error orther', async () => {
    //   mockCategorysRepository.create.mockRejectedValue(mockError);
    //   try {
    //     await service.createCategory(mockNewCategory);
    //   } catch (error) {
    //     expect(error.message).toEqual(mockError.message);
    //   }
    // });
  });

  describe('findOrderByIdAndUpdateStatus', () => {
    it('[Expect-Success] should return new user', async () => {
      mockOrdersRepository.findById.mockResolvedValue(mockOrder);

      const result = await service.findOrderByIdAndUpdateStatus(mockOrder._id, {
        status: ORDER_STATUS_ENUM.DELIVERED,
      });

      expect(result).toEqual(mockOrder);
    });
  });
});
