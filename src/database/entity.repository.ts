import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
  QueryOptions,
  // ClientSession,
} from 'mongoose';
import { objectId } from 'src/common/types';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  findById(
    id: objectId | string,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findById(id, {
        ...projection,
      })
      .exec();
  }

  findOne(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
      })
      .exec();
  }

  find(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions<T> | null,
  ): Promise<T[] | null> {
    return this.entityModel
      .find(
        entityFilterQuery,
        {
          ...projection,
        },
        options,
      )
      .exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async updateOne(
    entityFilterQuery: FilterQuery<T>,
    updateEntitydata: UpdateQuery<unknown>,
    options: QueryOptions<T> = { new: true },
  ): Promise<T | unknown | null> {
    return await this.entityModel.updateOne(
      entityFilterQuery,
      updateEntitydata,
      options,
    );
  }

  findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntitydata: UpdateQuery<unknown>,
    options: QueryOptions<T> = { new: true },
  ): Promise<T | null> {
    return this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEntitydata, options)
      .then((doc) => {
        return doc;
      });
  }

  async findByIdAndUpdate(
    id: objectId | string,
    updateEntitydata: UpdateQuery<unknown>,
    options: QueryOptions<T> = { new: true },
  ): Promise<T | null> {
    return await this.entityModel.findByIdAndUpdate(
      id,
      updateEntitydata,
      options,
    );
  }

  async findOneAndDelete(
    entityFilterQuery: FilterQuery<T>,
    entityOption?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndDelete(entityFilterQuery, entityOption);
  }

  async findByIdAndDelete(
    id: objectId | string,
    entityOption?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.entityModel.findByIdAndDelete(id, entityOption);
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
