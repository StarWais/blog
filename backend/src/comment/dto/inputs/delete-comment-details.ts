import { InputType } from '@nestjs/graphql';
import { LikeCommentInput } from './like-comment.input';

@InputType()
export class DeleteCommentInput extends LikeCommentInput {}
