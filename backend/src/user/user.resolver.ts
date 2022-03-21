import { Roles } from './../decorators/roles.decorator';
import { FileUpload } from './../upload/models/upload.model';
import { CurrentUser } from './../decorators/current-user.decorator';
import { GqlAuthGuard } from './../guards/gql-auth.guard';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, Role } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdateUserAvatarInput } from './dto/inputs/update-user-avatar.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FileUpload)
  async updateMyAvatar(
    @Args('details') details: UpdateUserAvatarInput,
    @CurrentUser() currentUser: User,
  ) {
    const avatar = await this.userService.updateMyAvatar(details, currentUser);
    return avatar;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getUser(@Args() getUserArgs: GetUserArgs) {
    const user = await this.userService.getUserById(getUserArgs.id);
    return user;
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllUsers(@Args() paginationArgs: PaginationArgs) {
    const users = await this.userService.getAllUsers(paginationArgs);
    return users;
  }

  @Query(() => Boolean)
  async emailExists(@Args('email') email: string) {
    const emailExists = await this.userService.emailUserExists(email);
    return emailExists;
  }

  @ResolveField('picture', () => FileUpload, { nullable: true })
  async picture(@Parent() currentUser: User) {
    if (!currentUser.pictureId) return null;
    const avatar = await this.userService.getUserAvatarUpload({
      id: currentUser.pictureId,
    });
    return avatar;
  }
}
