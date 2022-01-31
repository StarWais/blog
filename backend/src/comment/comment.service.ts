import { ReplyToCommentInput } from './dto/inputs/reply-to-comment.input';
import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { User } from './../user/models/user.model';
import { CreateCommentInput } from './dto/inputs/create-comment.input';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  createComment(details: CreateCommentInput, user: User) {
    const { postId, content } = details;
    return this.prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: user.id } },
      },
    });
  }

  replyToComment(details: ReplyToCommentInput, user: User) {
    const { postId, content, replyTo } = details;
    return this.prisma.comment.create({
      data: {
        content,
        replyTo,
        post: { connect: { id: postId } },
        author: { connect: { id: user.id } },
      },
    });
  }

  getPostComments(postId: number) {
    return this.prisma.comment.findMany({
      where: { post: { id: postId } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
