import { Test, TestingModule } from '@nestjs/testing';
import { FlashSalesService } from './flash-sales.service';
import { FlashSalesRepository } from './flash-sales.repository';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../emails/emails.service';
import { SchedulerRegistry } from '@nestjs/schedule';

import {
  mockError,
  mockFlashSale,
  mockItem,
  mockNewFlashSale,
  mockNewFlashSaleItem,
  mockQuantity,
  mockUpdateFlashSale,
} from './flash-sales.mock';

describe('FlashSalesService', () => {
  let service: FlashSalesService;

  const mockFlashSalesRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const mockItemsService = {
    findItemById: jest.fn(),
  };

  const mockUsersService = {};
  const mockEmailService = {};
  const mockSchedulerRegistry = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlashSalesService,
        FlashSalesRepository,
        ItemsService,
        UsersService,
        EmailService,
        SchedulerRegistry,
      ],
    })
      .overrideProvider(FlashSalesRepository)
      .useValue(mockFlashSalesRepository)
      .overrideProvider(ItemsService)
      .useValue(mockItemsService)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(EmailService)
      .useValue(mockEmailService)
      .overrideProvider(SchedulerRegistry)
      .useValue(mockSchedulerRegistry)
      .compile();

    service = module.get<FlashSalesService>(FlashSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFlashSale', () => {
    it('[Expect-Success] should create a flash sale', async () => {
      mockFlashSalesRepository.create.mockResolvedValue(mockFlashSale);

      const result = await service.createFlashSale(mockNewFlashSale);

      expect(result).toEqual(mockFlashSale);
    });

    it('[Expect-fails] Error orther', async () => {
      mockFlashSalesRepository.create.mockRejectedValue(mockError);
      try {
        await service.createFlashSale(mockNewFlashSale);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findAllFlashSales', () => {
    it('[Expect-Success] return all flash sale', async () => {
      mockFlashSalesRepository.find.mockResolvedValue([mockFlashSale]);

      const result = await service.findAllFlashSales();

      expect(result).toEqual([mockFlashSale]);
    });

    it('[Expect-fails] Error orther', async () => {
      mockFlashSalesRepository.find.mockRejectedValue(mockError);
      try {
        await service.findAllFlashSales();
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findListFlashSales', () => {
    it('[Expect-Success] return all flash sale', async () => {
      mockFlashSalesRepository.find.mockResolvedValue([mockFlashSale]);

      const result = await service.findListFlashSales();

      expect(result).toEqual([mockFlashSale]);
    });

    it('[Expect-fails] Error orther', async () => {
      mockFlashSalesRepository.find.mockRejectedValue(mockError);
      try {
        await service.findListFlashSales();
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findFlashSaleById', () => {
    it('[Expect-Success] return a flash sale', async () => {
      mockFlashSalesRepository.findById.mockResolvedValue(mockFlashSale);

      const result = await service.findFlashSaleById(mockFlashSale._id);

      expect(result).toEqual(mockFlashSale);
    });

    it('[Expect-fails] Error orther', async () => {
      mockFlashSalesRepository.findById.mockRejectedValue(mockError);
      try {
        await service.findFlashSaleById(mockFlashSale._id);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });

    it('[Expect-fails] Flash sale does not exist', async () => {
      mockFlashSalesRepository.findById.mockResolvedValue(undefined);
      try {
        await service.findFlashSaleById(mockFlashSale._id);
      } catch (error) {
        expect(error.message).toEqual('Flash sale does not exist!');
      }
    });
  });

  describe('findOneFlashSale', () => {
    it('[Expect-Success] return a flash sale', async () => {
      mockFlashSalesRepository.findOne.mockResolvedValue(mockFlashSale);

      const result = await service.findOneFlashSale(mockFlashSale._id);

      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('updateFlashSaleItem', () => {
    it('[Expect-Success] return a item update in flash sale', async () => {
      mockFlashSalesRepository.updateOne.mockResolvedValue(mockFlashSale);

      const result = await service.updateFlashSaleItem(
        mockFlashSale._id,
        mockItem,
      );

      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('updateStockItemFlashSale', () => {
    it('[Expect-Success] plush stock item in flash sale', async () => {
      mockFlashSalesRepository.updateOne.mockResolvedValue(mockFlashSale);

      const result = await service.updateStockItemFlashSale(
        mockFlashSale._id,
        mockItem._id,
        mockQuantity,
      );

      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('updateFlashSaleById', () => {
    it('[Expect-Success] return flash sale update', async () => {
      mockFlashSalesRepository.findByIdAndUpdate.mockResolvedValue(
        mockFlashSale,
      );

      const result = await service.updateFlashSaleById(
        mockFlashSale._id,
        mockUpdateFlashSale,
      );

      expect(result).toEqual(mockFlashSale);
    });

    it('[Expect-fails] Error orther', async () => {
      mockFlashSalesRepository.findByIdAndUpdate.mockRejectedValue(mockError);
      try {
        await service.updateFlashSaleById(
          mockFlashSale._id,
          mockUpdateFlashSale,
        );
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('addItemToFlashSale', () => {
    it('[Expect-Success] add item to flash sale and return flash sale', async () => {
      mockFlashSalesRepository.findOne.mockResolvedValue(undefined);
      mockFlashSalesRepository.findByIdAndUpdate.mockResolvedValue(
        mockFlashSale,
      );

      mockItemsService.findItemById.mockResolvedValue(mockItem);

      const result = await service.addItemToFlashSale(
        mockFlashSale._id,
        mockNewFlashSaleItem,
      );

      expect(result).toEqual(mockFlashSale);
    });

    it('[Expect-fails] Error orther', async () => {
      mockFlashSalesRepository.findOne.mockRejectedValue(mockError);
      try {
        await service.addItemToFlashSale(
          mockFlashSale._id,
          mockNewFlashSaleItem,
        );
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });

    it('[Expect-fails] Item is existed in flash sale', async () => {
      mockFlashSalesRepository.findOne.mockResolvedValue(mockFlashSale);
      try {
        await service.addItemToFlashSale(
          mockFlashSale._id,
          mockNewFlashSaleItem,
        );
      } catch (error) {
        expect(error.message).toEqual('Item is existed in flash sale!');
      }
    });

    it('[Expect-fails] Orther error', async () => {
      mockFlashSalesRepository.findOne.mockResolvedValue(undefined);
      mockFlashSalesRepository.findByIdAndUpdate.mockRejectedValue(mockError);

      mockItemsService.findItemById.mockResolvedValue(mockItem);

      try {
        await service.addItemToFlashSale(
          mockFlashSale._id,
          mockNewFlashSaleItem,
        );
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findFlashSaleAndDeleteById', () => {
    it('[Expect-Success] return flash sale update', async () => {
      mockFlashSalesRepository.findByIdAndDelete.mockResolvedValue(
        mockFlashSale,
      );

      const result = await service.findFlashSaleAndDeleteById(
        mockFlashSale._id,
      );

      expect(result).toReturn;
    });

    it('[Expect-fails] Error orther', async () => {
      mockFlashSalesRepository.findByIdAndDelete.mockRejectedValue(mockError);
      try {
        await service.findFlashSaleAndDeleteById(mockFlashSale._id);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });

    it('[Expect-fails] Error orther', async () => {
      mockFlashSalesRepository.findByIdAndDelete.mockResolvedValue(undefined);
      try {
        await service.findFlashSaleAndDeleteById(mockFlashSale._id);
      } catch (error) {
        expect(error.message).toEqual('Flash sale does not exist!');
      }
    });
  });
});
