import { UploadService } from './../upload/upload.service';
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
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/inputs/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly uploadService: UploadService,
    private readonly userService: UserService,
  ) {}
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

  @ResolveField('picture', () => FileUpload)
  async picture(@Parent() currentUser: User) {
    if (!currentUser.pictureId) return null;
    const avatar = await this.userService.getUserAvatarUpload({
      id: currentUser.pictureId,
    });
    return avatar;
  }
}
