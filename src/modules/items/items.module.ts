import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from '../categories/categories.module';
import { FlashSalesModule } from '../flash-sales/flash-sales.module';

import { ItemsController } from './items.controller';
import { ItemsRepository } from './items.repository';
import { ItemsService } from './items.service';
import { ItemSchema } from './schema/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Item',
        schema: ItemSchema,
      },
    ]),
    CategoriesModule,
    FlashSalesModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  exports: [ItemsService],
})
export class ItemsModule {}
