import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostUpload {
  @Field(() => Int, { description: 'The unique identifier of the picture' })
  id: number;
  @Field({ description: "Picture's file name" })
  fileName: string;
  @Field({ description: "Picture's file type" })
  fileType: string;
  @Field(() => Int, { description: "Picture's file size" })
  fileSize: number;
  @Field({ description: 'Path to the picture' })
  filePath: string;
  @Field({ description: "Picture's creation date" })
  createdAt: Date;
}
