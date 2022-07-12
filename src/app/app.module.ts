import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { ItemsModule } from '../modules/items/items.module';
import { VouchersModule } from 'src/modules/vouchers/vouchers.module';
import { UploadModule } from 'src/modules/upload/upload.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { FlashSalesModule } from 'src/modules/flash-sales/flash-sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    UploadModule,
    CategoriesModule,
    ItemsModule,
    // VouchersModule,
    FlashSalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
