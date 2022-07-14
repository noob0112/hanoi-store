import { ROLE_ENUM, USER_STATUS_ENUM } from '../users.constant';
import { INewUser } from './new-user.entity';

export interface IUser extends INewUser {
  _id: string;

  role: ROLE_ENUM;

  status: USER_STATUS_ENUM;
}
