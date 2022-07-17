import { Test, TestingModule } from '@nestjs/testing';
import { ORDER_STATUS_ENUM } from './orders.constant';
import { OrdersController } from './orders.controller';
import { mockNewOrder, mockOrder, mockUser } from './orders.mock';
import { OrdersService } from './orders.service';
describe('OrdersController', () => {
  let controller: OrdersController;

  const mockOrdersService = {
    createOrder: jest.fn(),
    findOrderByIdAndUpdateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockOrdersService)
      .compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('[Expect-Success] should create a order', async () => {
      mockOrdersService.createOrder.mockResolvedValue(mockOrder);

      const result = await controller.createOrder(
        { user: { _id: mockUser._id } },
        mockNewOrder,
      );

      expect(result).toEqual(mockOrder);
    });
  });

  describe('findOrderByIdAndUpdateStatus', () => {
    it('[Expect-Success] should update status order', async () => {
      mockOrdersService.findOrderByIdAndUpdateStatus.mockResolvedValue(
        mockOrder,
      );

      const result = await controller.findOrderByIdAndUpdateStatus(
        { id: mockOrder._id },
        { status: ORDER_STATUS_ENUM.DELIVERED },
      );

      expect(result).toEqual(mockOrder);
    });
  });
});
