import { Test, TestingModule } from '@nestjs/testing';
import { mockObjectIdDto } from '../../common/mocks';
import { CategoriesController } from './categories.controller';
import {
  mockCategory,
  mockCategoryStatus,
  mockNewCategory,
  mockUpdateCategory,
} from './categories.mock';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  const mockCategorysService = {
    createCategory: jest.fn(),
    findAllCategories: jest.fn(),
    findListCategories: jest.fn(),
    findCategoryById: jest.fn(),
    findAndUpdateCategoryById: jest.fn(),
    findAndDeleteCategoryById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockCategorysService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCategory', () => {
    it('[Expect-Success] should create a category', async () => {
      mockCategorysService.createCategory.mockResolvedValue(mockCategory);

      const result = await controller.createCategory(mockNewCategory);

      expect(result).toEqual(mockCategory);
    });
  });

  describe('findAllCategories', () => {
    it('[Expect-Success] should return list categories', async () => {
      mockCategorysService.findListCategories.mockResolvedValue([mockCategory]);

      const result = await controller.findListCategories();

      expect(result).toEqual([mockCategory]);
    });
  });

  describe('findCategoryById', () => {
    it('[Expect-Success] should return a category', async () => {
      mockCategorysService.findCategoryById.mockResolvedValue(mockCategory);

      const result = await controller.findCategoryById(mockObjectIdDto);

      expect(result).toEqual(mockCategory);
    });
  });

  describe('updateCategoryById', () => {
    it('[Expect-Success] should return a category before update', async () => {
      mockCategorysService.findAndUpdateCategoryById.mockResolvedValue(
        mockCategory,
      );

      const result = await controller.updateCategoryById(
        mockObjectIdDto,
        mockUpdateCategory,
      );

      expect(result).toEqual(mockCategory);
    });
  });

  describe('updateStatusCategoryById', () => {
    it('[Expect-Success] should create a category', async () => {
      mockCategorysService.findAndUpdateCategoryById.mockResolvedValue(
        mockCategory,
      );

      const result = await controller.updateStatusCategoryById(
        mockObjectIdDto,
        mockCategoryStatus,
      );

      expect(result).toEqual(mockCategory);
    });
  });

  describe('deleteCategory', () => {
    it('[Expect-Success] should create a category', async () => {
      mockCategorysService.findAndDeleteCategoryById.mockResolvedValue(
        mockCategory,
      );

      const result = await controller.deleteCategory(mockObjectIdDto);

      expect(result).toReturn;
    });
  });
});
