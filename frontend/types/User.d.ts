import { Comment } from './Comment';
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
  picture?: Picture;
  lastActivedAt: Date;
  createdAt: number;
  description?: string;
}

export interface Profile extends Omit<User, 'email' | 'role' | 'createdAt'> {
  likesCount: number;
  commentsCount: number;
  postsCount: number;
  recentPosts: Post[];
  recentComments: Comment[];
}
