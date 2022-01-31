import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { CreateCommentInput } from './create-comment.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ReplyToCommentInput extends CreateCommentInput {
  @Field(() => Int, { description: 'Reply to which post' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  replyTo: number;
}
