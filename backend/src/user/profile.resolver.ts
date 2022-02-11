import { FileUpload } from './../upload/models/upload.model';
import { Comment } from './../comment/models/comment.model';
import { Post } from 'src/post/models/post.model';
import { Int, Parent, ResolveField, Resolver, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { Profile } from './models/profile.model';
import { Query } from '@nestjs/graphql';
import { GetUserArgs } from './dto/args/get-user.args';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Profile)
  async getProfile(@Args() getUserArgs: GetUserArgs) {
    const profile = await this.userService.getUserById(getUserArgs.id);
    return profile;
  }

  @ResolveField('likesCount', () => Int)
  async getLikesCount(@Parent() currentUser: User) {
    const count = await this.userService.getTotalLikesCount(currentUser.id);
    return count;
  }

  @ResolveField('commentsCount', () => Int)
  async getCommentsCount(@Parent() currentUser: User) {
    const count = await this.userService.getTotalCommentsCount(currentUser.id);
    return count;
  }
  @ResolveField('postsCount', () => Int)
  async getPostsCount(@Parent() currentUser: User) {
    const count = await this.userService.getUserPostsCount(currentUser.id);
    return count;
  }
  @ResolveField('recentPosts', () => [Post])
  async getRecentPosts(@Parent() currentUser: User) {
    const posts = await this.userService.getUsersRecentPosts(currentUser.id);
    return posts;
  }
  @ResolveField('recentComments', () => [Comment])
  async getRecentComments(@Parent() currentUser: User) {
    const comments = await this.userService.getUserRecentComments(
      currentUser.id,
    );
    return comments;
  }
  @ResolveField('picture', () => FileUpload)
  async picture(@Parent() currentUser: User) {
    if (!currentUser.pictureId) return null;
    const avatar = await this.userService.getUserAvatarUpload({
      id: currentUser.pictureId,
    });
    return avatar;
  }
}
