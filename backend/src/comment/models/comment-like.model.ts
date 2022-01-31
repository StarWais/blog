import { User } from './../../user/models/user.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';

@ObjectType()
export class CommentLike {
  @Field(() => Int, { description: 'Comment like id' })
  id: number;
  @Field(() => Int)
  commentId: number;
  @Field(() => Comment)
  comment: Comment;
  @Field(() => Int)
  authorId: number;
  @Field(() => User)
  author: User;
}
