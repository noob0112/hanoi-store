import { ROLE_ENUM, USER_STATUS_ENUM } from '../users/users.constant';
import { ILogin, ISignUp } from './entities';

export const mockSignUp: ISignUp = {
  userName: 'test1',
  fullName: 'test1',
  email: 'test1@gmail.com',
  phoneNumber: '0',
  password: '123456',
  address: 'Ha Noi',
};

export const mockSignUpResponse = {
  _id: 1,
  userName: 'test1',
  fullName: 'test1',
  email: 'test1@gmail.com',
  address: 'Ha Noi',
};

export const mockUserName = 'userName';

export const mockPass = 'pass';

export const mockUserPending = {
  status: USER_STATUS_ENUM.PENDING,
};

export const mockUser = {
  _id: 'id',
  userName: 'userName',
  fullName: 'fullName',
  email: 'email',
  phoneNumber: 'phoneNumber',
  password: 'secret',
  address: 'address',
  role: ROLE_ENUM.USER,
  status: USER_STATUS_ENUM.ACTION,
};

export const mockUserTokenPending = {
  _id: 'id',
  email: 'email',
  role: ROLE_ENUM.USER,
  status: USER_STATUS_ENUM.PENDING,
};

export const mockToken = 'token';

export const mockLoginReturn: ILogin = {
  accessToken: 'accessToken',
  user: {
    _id: 'id',
    fullName: 'fullName',
    email: 'email',
    address: 'address',
  },
};
