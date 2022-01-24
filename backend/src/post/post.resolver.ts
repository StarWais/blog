import { PostUploadService } from './../post-upload/post-upload.service';
import { PostUpload } from './../post-upload/models/post-upload.model';
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

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly postUploadService: PostUploadService,
  ) {}

  @Query(() => Post, { description: 'Get a post by id or slug' })
  async post(
    @Args() searchArgs: GetPostArgs,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.getPost(searchArgs, currentUser);
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
  async publishedPosts(@Args() paginationArgs: PaginationArgs) {
    const publishedPosts = await this.postService.getPublishedPosts(
      paginationArgs,
    );
    return publishedPosts;
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Post, { description: 'Create a new post' })
  async createPost(
    @Args('details') details: CreatePostInput,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.createPost(details, currentUser);
    return post;
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Post, { description: 'Update a post' })
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('details') details: UpdatePostInput,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.updatePost(id, details, currentUser);
    return post;
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Int, { description: 'Delete a post' })
  async deletePost(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.deletePost(id, currentUser);
    return post.id;
  }

  @ResolveField('author', () => User)
  async author(@Parent() post: Post) {
    const { authorId } = post;
    const user = await this.userService.getUserById(authorId);
    return user;
  }
  @ResolveField('picture', () => PostUpload)
  async picture(@Parent() post: Post) {
    const { pictureId } = post;
    const picture = await this.postUploadService.getFileById(pictureId);
    return picture;
  }
}
