import { Token } from './token.modal';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Auth extends Token {
  @Field(() => User)
  user: User;
}
