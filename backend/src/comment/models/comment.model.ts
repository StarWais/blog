import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './../../user/models/user.model';
import { CommentLike } from './comment-like.model';

@ObjectType()
export class Comment {
  @Field(() => Int, { description: 'Comment id' })
  id: number;
  @Field({ description: 'The comment text' })
  content: string;
  @Field(() => Int, { description: 'Post id' })
  postId: number;
  @Field(() => Int, { description: 'User id' })
  authorId: number;
  @Field(() => User, { description: "Comment's author" })
  author: User;
  @Field({ description: "Comment's creation date" })
  createdAt: Date;
  @Field({ description: "Comment's last update date" })
  updatedAt: Date;
  @Field(() => [CommentLike])
  likes: CommentLike[];
}
