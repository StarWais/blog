import { CommentLikeService } from './comment-like.service';
import { ReplyToCommentInput } from './dto/inputs/reply-to-comment.input';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from './../decorators/current-user.decorator';
import { Comment } from './models/comment.model';
import { UserService } from './../user/user.service';
import { CommentService } from './comment.service';
import { User } from './../user/models/user.model';
import { GqlAuthGuard } from './../guards/gql-auth.guard';
import { CreateCommentInput } from './dto/inputs/create-comment.input';
import { CommentLike } from './models/comment-like.model';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentLikeService: CommentLikeService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async createComment(
    @Args('details') createCommentDetails: CreateCommentInput,
    @CurrentUser() currentUser: User,
  ) {
    const comment = await this.commentService.createComment(
      createCommentDetails,
      currentUser,
    );
    return comment;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async replyToComment(
    @Args('details') replyToCommentDetails: ReplyToCommentInput,
    @CurrentUser() currentUser: User,
  ) {
    const comment = await this.commentService.replyToComment(
      replyToCommentDetails,
      currentUser,
    );
    return comment;
  }

  @ResolveField('author', () => User)
  author(@Parent() comment: Comment) {
    return this.userService.getUserById(comment.authorId);
  }
  @ResolveField('likes', () => [CommentLike])
  likes(@Parent() comment: Comment) {
    return this.commentLikeService.getCommentLikes(comment.id);
  }
}
