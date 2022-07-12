import { ROLE_ENUM, STATUS_ENUM } from 'src/modules/users/users.constant';

export interface ITokenPayload {
  _id: string;
  email: string;
  status: STATUS_ENUM;
  role: ROLE_ENUM;
}
