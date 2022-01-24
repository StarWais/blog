import { LoginInput } from './login.input';
import { Field, InputType } from '@nestjs/graphql';
import { Length, IsNotEmpty } from 'class-validator';

@InputType()
export class SignUpInput extends LoginInput {
  @Field({ description: 'User name' })
  @IsNotEmpty()
  @Length(2, 255)
  name: string;
}
