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
  comments: Comment[];
}

export interface PageInfo {
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
}

export interface PaginatedPosts {
  nodes: Post[];
  pageInfo: PageInfo;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  author: User;
  createdAt: number;
}
