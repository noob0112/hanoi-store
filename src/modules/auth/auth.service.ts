import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AES, enc } from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

import { EmailService } from '../emails/emails.service';
import { ILogin, ISignUp, ITokenPayload } from './entities';
import { USER_STATUS_ENUM } from '../users/users.constant';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  //SIGNUP
  public async signUp(newUser: ISignUp): Promise<boolean> {
    newUser.password = AES.encrypt(
      newUser.password,
      process.env.PASS_SECRET,
    ).toString();

    const user = await this.usersService.create(newUser);

    const payload = this.getPayloadToken(user);

    this.emailService.sendUserConfirmation(
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
      throw new BadRequestException('userName or password is not correct!');
    }

    const hashedPassord = AES.decrypt(
      userFind.password,
      process.env.PASS_SECRET,
    );

    const originalPassword = hashedPassord.toString(enc.Utf8);

    if (originalPassword !== pass) {
      throw new BadRequestException('userName or password is not correct!');
    }

    const payload = this.getPayloadToken(userFind);

    const accessToken = this.generateToken(payload);

    if (userFind.status === USER_STATUS_ENUM.PENDING) {
      this.emailService.sendUserConfirmation(
        {
          email: 'hoang011220@gmail.com',
          fullName: 'Hoang Nguyen',
        },
        accessToken,
      );

      throw new UnauthorizedException(
        'You are not validate email. We are send you a email, please validate in 30 minute',
      );
    }

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

  async confirmEmail(token: string): Promise<void | boolean> {
    const user = this.jwtService.verify(token);
    if (user.status === USER_STATUS_ENUM.PENDING) {
      await this.usersService.findByIdAndUpdateStatus(
        user._id,
        USER_STATUS_ENUM.ACTION,
      );
    }
    return true;
  }

  private generateToken(data: ITokenPayload, options?: SignOptions): string {
    return this.jwtService.sign(data, options);
  }

  private getPayloadToken(user: IUser): ITokenPayload {
    return {
      _id: user._id,
      email: user.email,
      status: user.status,
      role: user.role,
    };
  }
}
