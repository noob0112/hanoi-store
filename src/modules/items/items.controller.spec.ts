import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { mockItem, mockNewItem, mockUpdateItem } from './items.mock';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;

  const mockItemsService = {
    createItem: jest.fn(),
    findListItems: jest.fn(),
    findItemById: jest.fn(),
    findItemByIdAndUpdate: jest.fn(),
    findItemByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    })
      .overrideProvider(ItemsService)
      .useValue(mockItemsService)
      .compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createItem', () => {
    it('[Expect-Success] should create a new item', async () => {
      mockItemsService.createItem.mockResolvedValue(mockItem);
      const result = await controller.createItem(mockNewItem);
      expect(result).toEqual(mockItem);
    });
  });

  describe('findListItems', () => {
    it('[Expect-Success] should return list items', async () => {
      mockItemsService.findListItems.mockResolvedValue([mockItem]);
      const result = await controller.findListItems();
      expect(result).toEqual([mockItem]);
    });
  });

  describe('findItemById', () => {
    it('[Expect-Success] should return a item update', async () => {
      mockItemsService.findItemById.mockResolvedValue(mockItem);
      const result = await controller.findItemById({ id: mockItem._id });
      expect(result).toEqual(mockItem);
    });
  });

  describe('findItemByIdAndUpdate', () => {
    it('[Expect-Success] should return a item', async () => {
      mockItemsService.findItemByIdAndUpdate.mockResolvedValue(mockItem);
      const result = await controller.findItemByIdAndUpdate(
        { id: mockItem._id },
        mockUpdateItem,
      );
      expect(result).toEqual(mockItem);
    });
  });

  describe('findItemByIdAndDelete', () => {
    it('[Expect-Success] should delete item', async () => {
      mockItemsService.findItemByIdAndDelete.mockResolvedValue(mockItem);
      const result = await controller.findItemByIdAndDelete({
        id: mockItem._id,
      });
      expect(result).toReturn;
    });
  });
});
