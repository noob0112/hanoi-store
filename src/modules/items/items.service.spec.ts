import { Test, TestingModule } from '@nestjs/testing';

import { ItemsService } from './items.service';
import { ItemsRepository } from './items.repository';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { CategoriesService } from '../categories/categories.service';
import { mockCategory } from '../categories/categories.mock';
import { mockError, mockItem, mockNewItem } from './items.mock';
import { mockFlashSale } from '../flash-sales/flash-sales.mock';

describe('ItemsService', () => {
  let service: ItemsService;

  const mockItemsRepository = {
    create: jest.fn(),
    findListItem: jest.fn(),
    findItemById: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const mockCategoriesService = {
    findCategoryById: jest.fn(),
    findAndAddItem: jest.fn(),
  };

  const mockFlashSalesService = { findOneFlashSale: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        ItemsRepository,
        CategoriesService,
        FlashSalesService,
      ],
    })
      .overrideProvider(ItemsRepository)
      .useValue(mockItemsRepository)
      .overrideProvider(CategoriesService)
      .useValue(mockCategoriesService)
      .overrideProvider(FlashSalesService)
      .useValue(mockFlashSalesService)
      .compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createItem', () => {
    it('[Expect-Success] should create a item', async () => {
      mockCategoriesService.findCategoryById.mockResolvedValue(mockCategory);

      mockItemsRepository.create.mockResolvedValue(mockItem);

      mockCategoriesService.findAndAddItem.mockResolvedValue(mockCategory);

      const result = await service.createItem(mockNewItem);

      expect(result).toEqual(mockItem);
    });

    it('[Expect-fails] Error orther', async () => {
      mockCategoriesService.findCategoryById.mockRejectedValue(mockError);
      try {
        await service.createItem(mockNewItem);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });

    it('[Expect-fails] create item error', async () => {
      mockCategoriesService.findCategoryById.mockResolvedValue(mockCategory);

      mockItemsRepository.create.mockRejectedValue(mockError);

      try {
        await service.createItem(mockNewItem);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findListItems', () => {
    it('[Expect-Success] should return list items', async () => {
      mockItemsRepository.findListItem.mockResolvedValue([mockItem]);

      mockFlashSalesService.findOneFlashSale.mockResolvedValue(mockFlashSale);

      const result = await service.findListItems();

      expect(result).toReturn;
    });

    it('[Expect-fails] Error other', async () => {
      mockItemsRepository.findListItem.mockRejectedValue(mockError);

      try {
        await service.findListItems();
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findItemByIdAndUpdateStock', () => {
    it('[Expect-Success] should return item update', async () => {
      mockItemsRepository.findById.mockResolvedValue(mockItem);
      mockItemsRepository.findByIdAndUpdate.mockResolvedValue(mockItem);
      mockFlashSalesService.findOneFlashSale.mockResolvedValue(mockFlashSale);

      const result = await service.findItemByIdAndUpdateStock(mockItem._id, 1);

      expect(result).toReturn;
    });

    it('[Expect-fails] Error other', async () => {
      mockItemsRepository.findById.mockResolvedValue(mockItem);

      try {
        await service.findItemByIdAndUpdateStock(mockItem._id, 2);
      } catch (error) {
        expect(error.message).toEqual('Not buy quantity than (1)');
      }
    });

    it('[Expect-fails] Error other', async () => {
      mockItemsRepository.findById.mockRejectedValue(mockError);

      try {
        await service.findItemByIdAndUpdateStock(mockItem._id, 1);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findItemById', () => {
    it('[Expect-Success] should return a item', async () => {
      mockItemsRepository.findItemById.mockResolvedValue(mockItem);

      mockFlashSalesService.findOneFlashSale.mockResolvedValue(mockFlashSale);

      const result = await service.findItemById(mockItem._id);

      expect(result).toReturn;
    });

    it('[Expect-fails] Error other', async () => {
      mockItemsRepository.findItemById.mockRejectedValue(mockError);

      try {
        await service.findItemById(mockItem._id);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });

    it('[Expect-fails] Error other', async () => {
      mockItemsRepository.findItemById.mockResolvedValue(undefined);

      try {
        await service.findItemById(mockItem._id);
      } catch (error) {
        expect(error.message).toEqual('item is not exist!');
      }
    });
  });

  describe('findItemByIdAndUpdateSold', () => {
    it('[Expect-Success] should return list item update', async () => {
      mockItemsRepository.findByIdAndUpdate.mockResolvedValue(mockItem);

      const result = await service.findItemByIdAndUpdateSold(mockItem._id, 1);

      expect(result).toReturn;
    });
  });

  describe('findItemByIdAndUpdateCancel', () => {
    it('[Expect-Success] should return list item update when cancel order', async () => {
      mockItemsRepository.findByIdAndUpdate.mockResolvedValue(mockItem);

      const result = await service.findItemByIdAndUpdateCancel(mockItem._id, 1);

      expect(result).toReturn;
    });
  });

  describe('findItemByIdAndDelete', () => {
    it('[Expect-Success] should return list item update when cancel order', async () => {
      mockItemsRepository.findByIdAndDelete.mockResolvedValue(mockItem);

      const result = await service.findItemByIdAndDelete(mockItem._id);

      expect(result).toReturn;
    });
  });
});
