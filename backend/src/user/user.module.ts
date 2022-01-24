import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserRepository, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
