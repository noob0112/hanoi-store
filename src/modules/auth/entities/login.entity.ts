export interface ILogin {
  accessToken: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    address: string;
  };
}
