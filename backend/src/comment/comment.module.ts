import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [UserModule],
  providers: [CommentService, CommentResolver, PrismaService],
  exports: [CommentService],
})
export class CommentModule {}
