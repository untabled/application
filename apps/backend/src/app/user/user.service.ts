import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { User } from '@untabled/types';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<PrismaUser | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return user;
    }

    return undefined;
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (user) {
      return user;
    }

    return undefined;
  }
}
