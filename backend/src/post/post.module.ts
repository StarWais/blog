import { PostUploadModule } from './../post-upload/post-upload.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

@Module({
  imports: [UserModule, PostUploadModule],
  providers: [PostResolver, PostService, PostRepository, PrismaService],
})
export class PostModule {}
