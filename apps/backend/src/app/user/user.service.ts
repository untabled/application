import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../utils/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | undefined> {
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
    });

    if (user) {
      return user;
    }

    return undefined;
  }
}
