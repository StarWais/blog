import { RefreshTokenInput } from './dto/refresh-token-input.input';
import { SignUpInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
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
  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    const user = await this.authService.getUserFromToken(auth.accessToken);
    return user;
  }
}
