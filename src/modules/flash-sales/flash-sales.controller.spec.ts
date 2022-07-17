import { Test, TestingModule } from '@nestjs/testing';
import { FlashSalesController } from './flash-sales.controller';
import {
  mockFlashSale,
  mockNewFlashSale,
  mockNewFlashSaleItem,
  mockUpdateFlashSale,
} from './flash-sales.mock';
import { FlashSalesService } from './flash-sales.service';
describe('FlashSalesController', () => {
  let controller: FlashSalesController;

  const mockFlashSalesService = {
    createFlashSale: jest.fn(),
    findListFlashSales: jest.fn(),
    findFlashSaleById: jest.fn(),
    updateFlashSaleById: jest.fn(),
    addItemToFlashSale: jest.fn(),
    findFlashSaleAndDeleteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashSalesController],
      providers: [FlashSalesService],
    })
      .overrideProvider(FlashSalesService)
      .useValue(mockFlashSalesService)
      .compile();

    controller = module.get<FlashSalesController>(FlashSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createFlashSale', () => {
    it('[Expect-Success] should create a flash sale', async () => {
      mockFlashSalesService.createFlashSale.mockResolvedValue(mockFlashSale);

      const result = await controller.createFlashSale(mockNewFlashSale);

      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('findListFlashSales', () => {
    it('[Expect-Success] should return list flash sales', async () => {
      mockFlashSalesService.findListFlashSales.mockResolvedValue([
        mockFlashSale,
      ]);

      const result = await controller.findListFlashSales();

      expect(result).toEqual([mockFlashSale]);
    });
  });

  describe('findFlashSaleById', () => {
    it('[Expect-Success] should return list flash sales', async () => {
      mockFlashSalesService.findFlashSaleById.mockResolvedValue([
        mockFlashSale,
      ]);

      const result = await controller.findFlashSaleById({
        id: mockFlashSale._id,
      });

      expect(result).toEqual([mockFlashSale]);
    });
  });

  describe('updateFlashSaleById', () => {
    it('[Expect-Success] should update a category', async () => {
      mockFlashSalesService.updateFlashSaleById.mockResolvedValue(
        mockFlashSale,
      );

      const result = await controller.updateFlashSaleById(
        { id: mockFlashSale._id },
        mockUpdateFlashSale,
      );

      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('updateFlashSaleStatusById', () => {
    it('[Expect-Success] should update a category', async () => {
      mockFlashSalesService.updateFlashSaleById.mockResolvedValue(
        mockFlashSale,
      );

      const result = await controller.updateFlashSaleStatusById(
        { id: mockFlashSale._id },
        { isOnGoing: true },
      );

      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('addItemToFlashSale', () => {
    it('[Expect-Success] should update a category', async () => {
      mockFlashSalesService.addItemToFlashSale.mockResolvedValue(mockFlashSale);

      const result = await controller.addItemToFlashSale(
        {
          id: mockFlashSale._id,
        },
        mockNewFlashSaleItem,
      );

      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('findFlashSaleAndDeleteById', () => {
    it('[Expect-Success] should update a category', async () => {
      mockFlashSalesService.findFlashSaleAndDeleteById.mockResolvedValue(
        mockFlashSale,
      );

      const result = await controller.findFlashSaleAndDeleteById({
        id: mockFlashSale._id,
      });

      expect(result).toReturn;
    });
  });
});
