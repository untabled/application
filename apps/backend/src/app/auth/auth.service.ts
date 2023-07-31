import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Token, User } from '@prisma/client';
import { PrismaService } from '../utils/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  private readonly saltOrRounds = 10;

  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService
  ) {}

  async signin(
    credentials: SignInDto,
    values: { userAgent: string; ipAddress: string }
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findByEmail(credentials.email);

    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(credentials.password, user.password);

    if (!isMatch) throw new UnauthorizedException();

    return this.newRefreshAndAccessToken(user, values);
  }

  async signup(credentials: SignUpDto): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      this.saltOrRounds
    );

    const user = await this.prisma.user.create({
      data: {
        ...credentials,
        password: hashedPassword,
      },
    });

    return !!user;
  }

  async logout(refreshString: string): Promise<boolean> {
    const refreshToken = await this.retrieveRefreshToken(refreshString);

    if (!refreshToken) throw new UnauthorizedException();

    const deleted = await this.prisma.token.delete({
      where: {
        id: refreshToken.id,
      },
    });

    return !!deleted;
  }

  async refresh(
    refreshString: string,
    values: { userAgent: string; ipAddress: string }
  ): Promise<{ accessToken: string } | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshString);

    if (!refreshToken) throw new UnauthorizedException();

    if (
      refreshToken.ipAddress !== values.ipAddress ||
      refreshToken.userAgent !== values.userAgent
    )
      throw new UnauthorizedException();

    const user = await this.userService.findOne(refreshToken.userId);

    if (!user) throw new UnauthorizedException();

    return { accessToken: this.signAccessToken(user.id) };
  }

  private retrieveRefreshToken(
    refreshString: string
  ): Promise<Token | undefined> {
    try {
      const decoded = verify(refreshString, process.env.REFRESH_SECRET);

      if (typeof decoded === 'string') {
        return undefined;
      }

      return this.prisma.token.findUnique({
        where: {
          id: decoded.id,
        },
      });
    } catch (e) {
      return undefined;
    }
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string }
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = await this.prisma.token.create({
      data: {
        userId: user.id,
        ...values,
      },
    });

    return {
      refreshToken: this.signRefreshToken(refreshObject),
      accessToken: this.signAccessToken(user.id),
    };
  }

  private signAccessToken(id: string): string {
    return sign(
      {
        userId: id,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '1h',
      }
    );
  }

  private signRefreshToken(token: Token): string {
    return sign(token, process.env.REFRESH_SECRET);
  }
}
