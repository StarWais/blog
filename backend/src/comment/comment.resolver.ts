import { Post } from 'src/post/models/post.model';
import { PostService } from './../post/post.service';
import { GetCommentsArgs } from './dto/args/get-comments.args';
import { CommentLikeService } from './comment-like.service';
import { ReplyToCommentInput } from './dto/inputs/reply-to-comment.input';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
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
import { DeleteCommentInput } from './dto/inputs/delete-comment-details';
import { PaginatedComment } from './models/paginated-comment.model';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentLikeService: CommentLikeService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query(() => PaginatedComment)
  async comments(@Args() getCommentsArgs: GetCommentsArgs) {
    const comments = await this.commentService.getPostComments(getCommentsArgs);
    return comments;
  }

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async deleteComment(
    @Args('details') deleteCommentDetails: DeleteCommentInput,
    @CurrentUser() currentUser: User,
  ) {
    const { commentId } = deleteCommentDetails;
    const comment = await this.commentService.deleteComment(
      commentId,
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
  @ResolveField('replyUser', () => User)
  replyUser(@Parent() comment: Comment) {
    return this.userService.getUserById(comment.replyToUserId);
  }
  @ResolveField('children', () => [Comment])
  replies(@Parent() comment: Comment) {
    return this.commentService.getReplies(comment.id);
  }
  @ResolveField('post', () => Post)
  post(@Parent() comment: Comment) {
    return this.postService.getPost({ id: comment.postId });
  }
}
