import { CurrentUser } from './../decorators/current-user.decorator';
import { GqlAuthGuard } from './../guards/gql-auth.guard';
import { Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
