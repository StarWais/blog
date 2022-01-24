export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  author: User;
}

export interface PaginatedPosts {
  nodes: Post[];
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
