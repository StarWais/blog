import { FileUpload } from './../upload/models/upload.model';
import { RolesGuard } from './../guards/roles.guard';
import { GqlAuthGuard } from './../guards/gql-auth.guard';
import { PaginationArgs } from './../common/pagination/pagination.args';

import { PaginatedPost } from './models/paginated-post.model';
import { UpdatePostInput } from './dto/inputs/update-post-input';
import { CreatePostInput } from './dto/inputs/create-post.input';
import { GetPostArgs } from './dto/args/get-post-args';
import { Role, User } from './../user/models/user.model';
import { UserService } from './../user/user.service';
import {
  Resolver,
  Args,
  ResolveField,
  Query,
  Mutation,
  Int,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Post } from './models/post.model';
import { PostService } from './post.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Roles } from '../decorators/roles.decorator';
import { GetPublishedPostsArgs } from './dto/args/get-published-posts-args';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query(() => Post, { description: 'Get a post by id or slug' })
  async post(
    @Args() searchArgs: GetPostArgs,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.getPost(searchArgs, currentUser);
    return post;
  }

  @Mutation(() => Post, { description: 'Publish a post' })
  async publish(
    @Args() searchArgs: GetPostArgs,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.publishPost(searchArgs, currentUser);
    return post;
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => PaginatedPost, { description: 'Get all posts' })
  async allPosts(@Args() paginationArgs: PaginationArgs) {
    const allPosts = await this.postService.getAllPosts(paginationArgs);
    return allPosts;
  }

  @Query(() => PaginatedPost, { description: 'Get all published posts' })
  async publishedPosts(@Args() getPublishedPostsArgs: GetPublishedPostsArgs) {
    const publishedPosts = await this.postService.getPublishedPosts(
      getPublishedPostsArgs,
    );
    return publishedPosts;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedPost, { description: 'Get your posts posts' })
  async myPosts(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() currentUser: User,
  ) {
    const myPosts = await this.postService.getMyPosts(
      paginationArgs,
      currentUser,
    );
    return myPosts;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { description: 'Create a new post' })
  async createPost(
    @Args('details') details: CreatePostInput,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.createPost(details, currentUser);
    return post;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { description: 'Update a post' })
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('details') details: UpdatePostInput,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.updatePost(id, details, currentUser);
    return post;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { description: 'Delete a post' })
  async deletePost(
    @Args() searchArgs: GetPostArgs,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.deletePost(searchArgs, currentUser);
    return post;
  }

  @ResolveField('author', () => User)
  async author(@Parent() post: Post) {
    const { authorId } = post;
    const user = await this.userService.getUserById(authorId);
    return user;
  }
  @ResolveField('picture', () => FileUpload)
  async picture(@Parent() post: Post) {
    const { pictureId } = post;
    const picture = await this.postService.getPostPictureUpload({
      id: pictureId,
    });
    return picture;
  }
  @ResolveField('likesCount', () => Int)
  async likesCount(@Parent() post: Post) {
    const { id } = post;
    const count = await this.postService.getPostLikesCount(id);
    return count;
  }
  @ResolveField('commentsCount', () => Int)
  async commentsCount(@Parent() post: Post) {
    const { id } = post;
    const count = await this.postService.getPostCommentsCount(id);
    return count;
  }
}
