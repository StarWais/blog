import { UserService } from './../user/user.service';
import { User } from './../user/models/user.model';
import { LikeCommentInput } from './dto/inputs/like-comment.input';
import { GqlAuthGuard } from './../guards/gql-auth.guard';
import { CurrentUser } from './../decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentLike } from './models/comment-like.model';
import { CommentLikeService } from './comment-like.service';

@Resolver(() => CommentLike)
export class CommentLikeResolver {
  constructor(
    private readonly commentLikeService: CommentLikeService,
    private readonly userService: UserService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommentLike)
  async likeComment(
    @Args('details') commentInput: LikeCommentInput,
    @CurrentUser() currentUser: User,
  ) {
    const { commentId } = commentInput;
    const commentLike = await this.commentLikeService.likeComment(
      commentId,
      currentUser,
    );
    return commentLike;
  }

  @ResolveField('author', () => User)
  async author(@Parent() commentLike: CommentLike) {
    const { authorId } = commentLike;
    const author = await this.userService.getUserById(authorId);
    return author;
  }
}
