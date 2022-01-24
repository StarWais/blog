import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field({ description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ description: 'User password' })
  @IsNotEmpty()
  @Length(8, 255)
  password: string;
}
