import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Length, IsNumber, IsPositive } from 'class-validator';

@InputType({ description: 'Create comment input' })
export class CreateCommentInput {
  @Field(() => Int, { description: 'Post id' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  postId: number;

  @Field({ description: 'The comment text' })
  @IsNotEmpty()
  @Length(1, 255)
  content: string;
}
