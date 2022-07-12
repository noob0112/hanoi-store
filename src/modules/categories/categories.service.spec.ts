import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategorysRepository } from './categories.repository';
import {
  mockCategory,
  mockCategoryId,
  mockCategoryItemSummary,
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
  });

  describe('findAllCategories', () => {
    it('[Expect-Success] should be return list categories', async () => {
      mockCategorysRepository.find.mockResolvedValue([mockCategory]);

      const result = await service.findAllCategories();

      expect(result).toEqual([mockCategory]);
    });
  });

  describe('findCategoryById', () => {
    it('[Expect-Success] should retun a category', async () => {
      mockCategorysRepository.findById.mockResolvedValue(mockCategory);

      const result = await service.findCategoryById(mockCategoryId);

      expect(result).toEqual(mockCategory);
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

  describe('findAndDeleteCategoryById', () => {
    it('[Expect-Success] should be delete category', async () => {
      mockCategorysRepository.findByIdAndDelete.mockResolvedValue(mockCategory);

      const result = await service.findAndDeleteCategoryById(mockCategoryId);

      expect(result).toReturn;
    });
  });
});
