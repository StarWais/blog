import { Picture } from './Picture.d';
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
