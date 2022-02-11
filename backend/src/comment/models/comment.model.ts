import { Post } from 'src/post/models/post.model';
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
  @Field(() => Int, { description: 'Reply to which comment', nullable: true })
  replyTo?: number;
  @Field(() => Int, { description: 'Parent comment id', nullable: true })
  parent?: number;
  @Field(() => Int, {
    description: 'User id to which this comment is a reply',
    nullable: true,
  })
  replyToUserId?: number;
  @Field(() => User, {
    description: 'User to which this comment is a reply',
    nullable: true,
  })
  replyUser?: User;
  @Field(() => [CommentLike])
  likes: CommentLike[];
  @Field(() => [Comment])
  children: Comment[];
  @Field(() => Post, { description: 'Post to which this comment is attached' })
  post: Post;
}
