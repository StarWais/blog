import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './../guards/gql-auth.guard';
import { User } from './../user/models/user.model';
import { RefreshTokenInput } from './dto/inputs/refresh-token-input.input';
import { SignUpInput } from './dto/inputs/signup.input';
import {
  Resolver,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.modal';
import { LoginInput } from './dto/inputs/login.input';
import { ChangePasswordInput } from './dto/inputs/change-password.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signUp(@Args('signupDetails') signupDetails: SignUpInput) {
    signupDetails.email = signupDetails.email.toLowerCase();
    return this.authService.signUp(signupDetails);
  }
  @Mutation(() => Auth)
  async logIn(@Args('loginDetails') loginDetails: LoginInput) {
    loginDetails.email = loginDetails.email.toLowerCase();
    return this.authService.login(loginDetails);
  }
  @Mutation(() => Token)
  async refreshToken(
    @Args('refreshTokenDetails') { token }: RefreshTokenInput,
  ) {
    return this.authService.refreshToken(token);
  }
  @ResolveField(() => User)
  async user(@Parent() auth: Auth) {
    const user = await this.authService.getUserFromToken(auth.accessToken);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @Args('changePasswordDetails') changePasswordDetails: ChangePasswordInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.authService.changePassword(currentUser, changePasswordDetails);
  }
}
