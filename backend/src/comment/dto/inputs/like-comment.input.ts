import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class LikeCommentInput {
  @Field(() => Int, { description: 'Comment id' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  commentId: number;
}
