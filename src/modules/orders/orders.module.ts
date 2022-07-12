import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from '../categories/categories.module';
import { FlashSalesModule } from '../flash-sales/flash-sales.module';
import { ItemsModule } from '../items/items.module';
import { VouchersModule } from '../vouchers/vouchers.module';

import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { OrderSchema } from './schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
    ]),
    ItemsModule,
    VouchersModule,
    CategoriesModule,
    FlashSalesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
