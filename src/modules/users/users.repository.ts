import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database';
import { UserDocument } from './schema';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
