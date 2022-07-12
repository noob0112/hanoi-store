import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../items/items.module';
import { FlashSalesController } from './flash-sales.controller';
import { FlashSalesRepository } from './flash-sales.repository';
import { FlashSalesService } from './flash-sales.service';
import { FlashSaleSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'FlashSale',
        schema: FlashSaleSchema,
      },
    ]),
    forwardRef(() => ItemsModule),
  ],
  controllers: [FlashSalesController],
  providers: [FlashSalesService, FlashSalesRepository],
  exports: [FlashSalesService],
})
export class FlashSalesModule {}
