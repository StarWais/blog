import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { User } from '../user/models/user.model';

@Injectable()
export class CommentLikeService {
  constructor(private readonly prisma: PrismaService) {}

  getCommentLikes(commentId: number) {
    return this.prisma.commentLike.findMany({
      where: { comment: { id: commentId } },
    });
  }

  async likeComment(commentId: number, user: User) {
    const { id: userId } = user;
    const like = await this.prisma.commentLike.findFirst({
      where: {
        comment: { id: commentId },
        author: { id: userId },
      },
    });
    if (like) {
      throw new BadRequestException('You already liked this comment');
    }
    return this.prisma.commentLike.create({
      data: {
        comment: { connect: { id: commentId } },
        author: { connect: { id: userId } },
      },
    });
  }
}
