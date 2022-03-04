import { IsNotEmpty, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @IsNotEmpty()
  @Field({ description: "User's current password" })
  oldPassword: string;

  @IsNotEmpty()
  @Length(8, 255)
  @Field({ description: "User's new password" })
  newPassword: string;
}
