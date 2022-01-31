import { UploadModule } from './../upload/upload.module';
import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [UploadModule],
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
