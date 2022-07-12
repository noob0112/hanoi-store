import { objectId } from '../types';

export class TimestampsMongodb {
  _id: objectId;

  createdAt?: Date;

  updatedAt?: Date;
}
