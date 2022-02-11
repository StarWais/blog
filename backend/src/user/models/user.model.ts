import { FileUpload } from './../../upload/models/upload.model';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User {
  @Field(() => Int, { description: 'The unique identifier of the user' })
  id: number;
  @Field({ description: "User's email" })
  email: string;
  @Field({ description: "User's name" })
  name: string;
  @Field(() => Int, { description: "User's avatar id", nullable: true })
  pictureId?: number;
  @Field({ description: "Users's avatar", nullable: true })
  picture?: FileUpload;
  @Field(() => Role, { description: "User's role" })
  role: Role;
  @Field({ description: "Users's last active date" })
  lastActivedAt: Date;
  @Field({ description: "Users's creation date" })
  createdAt: Date;
  @Field({ description: "User's description", nullable: true })
  description?: string;
}
