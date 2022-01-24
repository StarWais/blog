import { PostUploadService } from './post-upload.service';
import { PostUploadRepository } from './post-upload.repository';
import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { PostUploadResolver } from './post-upload.resolver';

@Module({
  imports: [],
  providers: [
    PrismaService,
    PostUploadService,
    PostUploadRepository,
    PostUploadResolver,
  ],
  exports: [PostUploadService],
})
export class PostUploadModule {}
