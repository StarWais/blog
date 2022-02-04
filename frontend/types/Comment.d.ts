export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  replyTo?: number;
  author: User;
  createdAt: number;
  updatedAt: number;
  parent?: number;
  replyToUserId?: number;
  replyUser?: User;
  children: Comment[];
  likes: CommentLike[];
}

export interface CommentLike {
  id: number;
  commentId: number;
  authorId: number;
  author: User;
}
