import { FileUpload } from './../upload/models/upload.model';
import { CurrentUser } from './../decorators/current-user.decorator';
import { GqlAuthGuard } from './../guards/gql-auth.guard';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('details') details: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    const updatedUser = await this.userService.updateUser(details, currentUser);
    return updatedUser;
  }

  @Query(() => User)
  async getProfile(@Args() getUserArgs: GetUserArgs) {
    const profile = await this.userService.getUserById(getUserArgs.id);
    return profile;
  }

  @ResolveField('picture', () => FileUpload)
  async picture(@Parent() currentUser: User) {
    if (!currentUser.pictureId) return null;
    const avatar = await this.userService.getUserAvatarUpload({
      id: currentUser.pictureId,
    });
    return avatar;
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
}
