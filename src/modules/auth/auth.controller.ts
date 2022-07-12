import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignUpDto, LoginDto, TokenDto, ResponseLoginDto } from './dtos';
import { ILogin } from './entities';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // SIGN-UP
  @ApiOperation({ summary: 'create user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'the user is not validate or is exited',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
  })
  @Post('/signup')
  async signUp(@Body() user: SignUpDto): Promise<boolean> {
    return this.authService.signUp(user);
  }

  // LOGIN
  @ApiOperation({ summary: 'login with username and password' })
  @ApiCreatedResponse({
    description: 'The user has been successfully login.',
    type: ResponseLoginDto,
  })
  @ApiBadRequestResponse({
    description: 'the user is not validate or is exited',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
  })
  @Post('/login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ILogin> {
    const data = await this.authService.login(user.userName, user.password);
    res.cookie('accessToken', data.accessToken, { httpOnly: true });
    return data;
  }

  // CONFIRM MAIL
  @ApiOperation({ summary: 'confirm your email' })
  @ApiOkResponse({
    description: 'The user verify email',
  })
  @ApiBadRequestResponse({
    description: 'The user do not verify email',
  })
  @Get('/confirm')
  async confirmEmail(@Query() query: TokenDto): Promise<boolean> {
    return await this.authService.confirmEmail(query.token);
  }
}
