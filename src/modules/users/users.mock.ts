import { INewUser, IUser } from './entities';
import { ROLE_ENUM, USER_STATUS_ENUM } from './users.constant';

export const mockNewUser: INewUser = {
  userName: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  address: '',
};

export const mockError = {
  message: 'message error',
};

export const mockUser: IUser = {
  _id: '',
  role: ROLE_ENUM.USER,
  status: USER_STATUS_ENUM.PENDING,
  userName: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  address: '',
};
