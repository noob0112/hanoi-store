import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
} from '../../swagger/error-exception';

import { AuthService } from './auth.service';
import { SignUpDto, LoginDto, TokenDto, LoginResponse } from './dtos';
import { ILogin } from './entities';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // SIGN-UP
  @ApiOperation({ summary: 'create user' })
  @ApiCreatedResponse({
    type: Boolean,
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'the user is not validate or is exited',
    type: BadRequestResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: InternalServerErrorResponse,
  })
  @Post('/signup')
  async signUp(@Body() user: SignUpDto): Promise<boolean> {
    return this.authService.signUp(user);
  }

  // LOGIN
  @ApiOperation({ summary: 'login with username and password' })
  @ApiCreatedResponse({
    description: 'The user has been successfully login.',
    type: LoginResponse,
  })
  @ApiBadRequestResponse({
    description: 'the user is not validate or is exited',
    type: BadRequestResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: InternalServerErrorResponse,
  })
  @Post('/login')
  async login(
    @Body() user: LoginDto,
    // @Res({ passthrough: true }) res: Response,
  ): Promise<ILogin> {
    const data = await this.authService.login(user.userName, user.password);
    // res.cookie('accessToken', data.accessToken, { httpOnly: true });
    return data;
  }

  // CONFIRM MAIL
  @ApiOperation({ summary: 'confirm your email' })
  @ApiOkResponse({
    description: 'The user verify email',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'The user do not verify email',
    type: BadRequestResponse,
  })
  @Get('/confirm')
  async confirmEmail(@Query() query: TokenDto): Promise<void | boolean> {
    return await this.authService.confirmEmail(query.token);
  }
}
