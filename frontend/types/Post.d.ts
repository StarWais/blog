import { Picture } from './Picture.d';
import { User } from './User.d';
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
  authorId: number;
  author: User;
  picture: Picture;
}
