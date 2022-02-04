import { LoginInput } from './login.input';
import { Field, InputType } from '@nestjs/graphql';
import { Length, IsNotEmpty, IsAlphanumeric } from 'class-validator';

@InputType()
export class SignUpInput extends LoginInput {
  @Field({ description: 'User name' })
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(2, 255)
  name: string;
}
