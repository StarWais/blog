import { Comment } from './../../comment/models/comment.model';
import { FileUpload } from './../../upload/models/upload.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'The unique identifier of the post' })
  id: number;
  @Field({ description: "Post's title" })
  title: string;
  @Field({ description: "Post's slug" })
  slug: string;
  @Field({ description: "Post's content" })
  content: string;
  @Field({ description: 'Is post published?' })
  published: boolean;
  @Field({ description: "Post's creation date" })
  createdAt: Date;
  @Field({ description: "Post's last update date" })
  updatedAt: Date;
  @Field(() => Int, {
    description: 'The unique identifier of the author of the post',
  })
  authorId: number;
  @Field(() => Int, {
    description: 'The unique identifier of the picture of the post',
  })
  pictureId: number;
  @Field(() => User, { description: 'The author of the post' })
  author: User;
  @Field(() => FileUpload, { description: 'The picture of the post' })
  picture: FileUpload;
  @Field(() => [Comment], { description: 'The comments of the post' })
  comments: Comment[];
}
