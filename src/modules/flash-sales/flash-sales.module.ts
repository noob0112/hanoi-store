import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EmailService } from '../emails/emails.service';
import { ItemsModule } from '../items/items.module';
import { UsersModule } from '../users/users.module';
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
    UsersModule,
  ],
  controllers: [FlashSalesController],
  providers: [
    FlashSalesService,
    FlashSalesRepository,
    SchedulerRegistry,
    EmailService,
  ],
  exports: [FlashSalesService],
})
export class FlashSalesModule {}
