import { Picture } from './Picture.d';
import { Post } from './Post';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  posts: Post[];
  picture?: Picture;
  likesCount: number;
  commentsCount: number;
  lastActivedAt: Date;
}
