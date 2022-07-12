import { ROLE_ENUM, STATUS_ENUM } from '../users.constant';
import { INewUser } from './new-user.entity';

export interface IUser extends INewUser {
  _id: string;

  role: ROLE_ENUM;

  status: STATUS_ENUM;
}
