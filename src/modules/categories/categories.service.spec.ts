import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategorysRepository } from './categories.repository';
import {
  mockCategory,
  mockCategoryId,
  mockCategoryItemSummary,
  mockError,
  mockNewCategory,
  mockUpdateCategory,
} from './categories.mock';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const mockCategorysRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndAddItem: jest.fn(),
    findByIdAndDelete: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, CategorysRepository],
    })
      .overrideProvider(CategorysRepository)
      .useValue(mockCategorysRepository)
      .compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCategory', () => {
    it('[Expect-Success] should create a category', async () => {
      mockCategorysRepository.create.mockResolvedValue(mockCategory);

      const result = await service.createCategory(mockNewCategory);

      expect(result).toEqual(mockCategory);
    });

    it('[Expect-fails] category is existed', async () => {
      mockCategorysRepository.create.mockRejectedValue({
        index: 0,
        code: 11000,
        keyPattern: { name: 1 },
        keyValue: { name: 'smart-phone' },
      });

      try {
        await service.createCategory(mockNewCategory);
      } catch (error) {
        expect(error.message).toEqual('Category name is existed!');
      }
    });

    it('[Expect-fails] Error orther', async () => {
      mockCategorysRepository.create.mockRejectedValue(mockError);
      try {
        await service.createCategory(mockNewCategory);
      } catch (error) {
        expect(error.message).toEqual(mockError.message);
      }
    });
  });

  describe('findAllCategories', () => {
    it('[Expect-Success] should be return list categories', async () => {
      mockCategorysRepository.find.mockResolvedValue([mockCategory]);

      const result = await service.findAllCategories();

      expect(result).toEqual([mockCategory]);
    });

    it('[Expect-fails] Sever error', async () => {
      mockCategorysRepository.find.mockRejectedValue(mockError);

      await service.findAllCategories().catch((error) => {
        expect(error.message).toEqual(mockError.message);
      });
    });
  });

  describe('findCategoryById', () => {
    it('[Expect-Success] should retun a category', async () => {
      mockCategorysRepository.findById.mockResolvedValue(mockCategory);

      const result = await service.findCategoryById(mockCategoryId);

      expect(result).toEqual(mockCategory);
    });

    it('[Expect-fails] Sever error', async () => {
      mockCategorysRepository.findById.mockRejectedValue(mockError);

      await service.findCategoryById(mockCategoryId).catch((error) => {
        expect(error.message).toEqual(mockError.message);
      });
    });

    it('[Expect-fails] Category Id is incorrect or not exist', async () => {
      mockCategorysRepository.findById.mockResolvedValue(undefined);

      await service.findCategoryById(mockCategoryId).catch((error) => {
        expect(error.message).toEqual('Category Id is incorrect or not exist!');
      });
    });
  });

  describe('findCategoryDetailById', () => {
    it('[Expect-Success] should return detail category', async () => {
      mockCategorysRepository.findById.mockResolvedValue(mockCategory);

      const result = await service.findCategoryDetailById(mockCategoryId);

      expect(result).toEqual(mockCategory);
    });

    it('[Expect-fails] Sever error', async () => {
      mockCategorysRepository.findById.mockRejectedValue(mockError);

      await service.findCategoryDetailById(mockCategoryId).catch((error) => {
        expect(error.message).toEqual(mockError.message);
      });
    });

    it('[Expect-fails] Category Id is incorrect or not exist', async () => {
      mockCategorysRepository.findById.mockResolvedValue(undefined);

      await service.findCategoryDetailById(mockCategoryId).catch((error) => {
        expect(error.message).toEqual('Category Id is incorrect or not exist!');
      });
    });
  });

  describe('findAndUpdateCategoryById', () => {
    it('[Expect-Success] should return a category before update', async () => {
      mockCategorysRepository.findByIdAndUpdate.mockResolvedValue(mockCategory);

      const result = await service.findAndUpdateCategoryById(
        mockCategoryId,
        mockUpdateCategory,
      );

      expect(result).toEqual(mockCategory);
    });

    it('[Expect-fails] Category Id is incorrect or not exist', async () => {
      mockCategorysRepository.findByIdAndUpdate.mockResolvedValue(undefined);

      await service
        .findAndUpdateCategoryById(mockCategoryId, mockUpdateCategory)
        .catch((error) => {
          expect(error.message).toEqual(
            'Category Id is incorrect or not exist!',
          );
        });
    });
  });

  describe('findAndAddItem', () => {
    it('[Expect-Success] should return a category before add item', async () => {
      mockCategorysRepository.findByIdAndAddItem.mockResolvedValue(
        mockCategory,
      );

      const result = await service.findAndAddItem(
        mockCategoryId,
        mockCategoryItemSummary,
      );

      expect(result).toEqual(mockCategory);
    });
  });

  describe('updateCategoryItem', () => {
    it('[Expect-Success] should be update item in category', async () => {
      mockCategorysRepository.updateOne.mockResolvedValue(mockCategory);

      const result = await service.updateCategoryItem(
        mockCategoryId,
        mockCategoryItemSummary,
      );

      expect(result).toEqual(mockCategory);
    });
  });

  describe('findAndDeleteCategoryById', () => {
    it('[Expect-Success] should be delete category', async () => {
      mockCategorysRepository.findByIdAndDelete.mockResolvedValue(mockCategory);

      const result = await service.findAndDeleteCategoryById(mockCategoryId);

      expect(result).toReturn;
    });

    it('[Expect-fails] Sever error', async () => {
      mockCategorysRepository.findByIdAndDelete.mockRejectedValue(mockError);

      await service.findAndDeleteCategoryById(mockCategoryId).catch((error) => {
        expect(error.message).toEqual(mockError.message);
      });
    });

    it('[Expect-fails] Category Id is incorrect or not exist', async () => {
      mockCategorysRepository.findByIdAndDelete.mockResolvedValue(undefined);

      await service.findAndDeleteCategoryById(mockCategoryId).catch((error) => {
        expect(error.message).toEqual('Category Id is incorrect or not exist!');
      });
    });
  });
});
