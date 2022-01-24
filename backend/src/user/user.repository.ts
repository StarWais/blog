import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  getUsers() {
    return this.prisma.user.findMany();
  }
  createUser(details: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: details,
    });
  }
}
