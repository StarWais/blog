import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export class UpdateUserAvatarInput {
  @Field(() => Int, { description: 'User name', nullable: true })
  @IsNumber()
  @IsPositive()
  pictureId: number;
}
