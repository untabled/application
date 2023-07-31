import {
  Body,
  Controller,
  Delete,
  Ip,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string,
    @Body() body: SignInDto
  ) {
    const { refreshToken, accessToken } = await this.authService.signin(body, {
      ipAddress: ip,
      userAgent: req.headers['user-agent'],
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    res.status(200).json(true);
  }

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string
  ) {
    if (!req.cookies.refresh_token) throw new UnauthorizedException();

    const { accessToken } = await this.authService.refresh(
      req.cookies.refresh_token,
      {
        ipAddress: ip,
        userAgent: req.headers['user-agent'],
      }
    );

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 15 * 60 * 1000),
      })
      .status(200);
  }

  @Delete('signout')
  async signout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.authService.signout(req.cookies.refresh_token);

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    res.status(200).json(true);
  }
}
