import { ROLE_ENUM, USER_STATUS_ENUM } from 'src/modules/users/users.constant';

export interface ITokenPayload {
  _id: string;
  email: string;
  status: USER_STATUS_ENUM;
  role: ROLE_ENUM;
}
