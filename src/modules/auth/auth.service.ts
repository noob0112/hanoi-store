import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AES, enc } from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

import { MailService } from '../emails/emails.service';
import { ILogin, ISignUp, ITokenPayload } from './entities';
import { STATUS_ENUM } from '../users/users.constant';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  //SIGNUP
  public async signUp(newUser: ISignUp): Promise<boolean> {
    newUser.password = AES.encrypt(
      newUser.password,
      process.env.PASS_SECRET,
    ).toString();

    const user = await this.usersService.create(newUser);

    const payload: ITokenPayload = {
      _id: user._id,
      email: user.email,
      status: user.status,
      role: user.role,
    };

    this.mailService.sendUserConfirmation(
      {
        email: 'hoang011220@gmail.com',
        fullName: 'Hoang Nguyen',
      },
      this.generateToken(payload),
    );

    return true;
  }

  //LOGIN
  public async login(userName: string, pass: string): Promise<ILogin> {
    const userFind = await this.usersService.findOneByUserName(userName);

    if (!userFind) {
      throw new HttpException(
        'email or password is not correct!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassord = AES.decrypt(
      userFind.password,
      process.env.PASS_SECRET,
    );

    const originalPassword = hashedPassord.toString(enc.Utf8);

    if (originalPassword !== pass) {
      throw new HttpException(
        'email or password is not correct!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: ITokenPayload = {
      _id: userFind._id,
      email: userFind.email,
      status: userFind.status,
      role: userFind.role,
    };

    const accessToken = this.generateToken(payload);

    return {
      accessToken,
      user: {
        _id: userFind._id,
        fullName: userFind.fullName,
        email: userFind.email,
        address: userFind.address,
      },
    };
  }

  async confirmEmail(token: string): Promise<boolean> {
    try {
      const user = this.jwtService.verify(token);
      if (user.status === STATUS_ENUM.PENDING) {
        await this.usersService.findByIdAndUpdateStatus(
          user._id,
          STATUS_ENUM.ACTION,
        );
      }
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private generateToken(data: ITokenPayload, options?: SignOptions): string {
    return this.jwtService.sign(data, options);
  }
}
