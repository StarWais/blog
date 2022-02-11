import { Comment } from './../../comment/models/comment.model';
import { Post } from './../../post/models/post.model';
import { Field, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Profile extends OmitType(User, ['email', 'role', 'createdAt']) {
  @Field(() => [Post], { description: "User's recent posts" })
  recentPosts: Post[];
  @Field(() => [Comment], { description: "User's recent comments" })
  recentComments: Comment[];
  @Field(() => Int, { description: "User's likes count" })
  likesCount: number;
  @Field(() => Int, { description: "User's comments count" })
  commentsCount: number;
  @Field(() => Int, { description: "User's posts count" })
  postsCount: number;
}
