import { Paginate } from 'src/common/pagination/pagination';
import { GetCommentsArgs } from './dto/args/get-comments.args';
import { ReplyToCommentInput } from './dto/inputs/reply-to-comment.input';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { Role, User } from './../user/models/user.model';
import { CreateCommentInput } from './dto/inputs/create-comment.input';
import { Prisma } from '@prisma/client';

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

  async getComment(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (comment) {
      return comment;
    }
    throw new NotFoundException(`Comment with ID "${commentId}" not found`);
  }

  async replyToComment(details: ReplyToCommentInput, user: User) {
    const { postId, content, replyTo } = details;
    const replyToComment = await this.getComment(replyTo);
    return this.prisma.comment.create({
      data: {
        content,
        replyTo,
        replyToUserId: replyToComment.authorId,
        post: { connect: { id: postId } },
        author: { connect: { id: user.id } },
        parent: !replyToComment.replyTo
          ? replyToComment.id
          : replyToComment.parent,
      },
    });
  }

  async deleteComment(commentId: number, currentUser: User) {
    const comment = await this.getComment(commentId);
    if (
      comment.authorId === currentUser.id ||
      currentUser.role === Role.ADMIN
    ) {
      return this.prisma.comment.delete({ where: { id: commentId } });
    }
    throw new ForbiddenException();
  }

  getPostComments(args: GetCommentsArgs) {
    const { postId, ...rest } = args;
    return Paginate<Comment, Prisma.CommentFindManyArgs>(
      rest,
      this.prisma,
      'comment',
      {
        where: { replyTo: null, post: { id: postId, published: true } },
        orderBy: { createdAt: 'desc' },
      },
    );
  }

  getReplies(commentId: number) {
    return this.prisma.comment.findMany({
      where: { parent: commentId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
