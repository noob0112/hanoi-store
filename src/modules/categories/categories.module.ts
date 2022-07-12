import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './schema/category.schema';
import { CategoriesService } from './categories.service';
import { CategorysRepository } from './categories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategorysRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
