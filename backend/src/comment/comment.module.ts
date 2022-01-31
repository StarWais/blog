import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeResolver } from './comment-like.resolver';

@Module({
  imports: [UserModule],
  providers: [
    CommentService,
    CommentResolver,
    PrismaService,
    CommentLikeService,
    CommentLikeResolver,
  ],
  exports: [CommentService],
})
export class CommentModule {}
