import { UploadModule } from './../upload/upload.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [UserModule, UploadModule],
  providers: [PostResolver, PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
