import { gql } from 'graphql-request';
import api from '../../../api/fetcher';
import { Comment, CommentLike } from '../../../types/Comment';
import { Paginated, PaginationDetails } from '../../../types/Pagination';

export interface CreateCommentDetails {
  postId: number;
  content: string;
}
export interface ReplyToCommentDetails extends CreateCommentDetails {
  replyTo: number;
}
export interface LikeCommentDetails {
  commentId: number;
}
export interface GetCommentsDetails extends PaginationDetails {
  postId: number;
}

export interface DeleteCommentDetails extends LikeCommentDetails {}

export const paginateComments = async (details: GetCommentsDetails) => {
  const query = gql`
    query Comments($limit: Int, $page: Int!, $postId: Int!) {
      comments(limit: $limit, page: $page, postId: $postId) {
        nodes {
          id
          content
          parent
          replyTo
          replyUser {
            id
            name
          }
          likes {
            commentId
            authorId
          }
          author {
            id
            name
            picture {
              filePath
            }
          }
          createdAt
          children {
            id
            content
            parent
            replyTo
            replyUser {
              id
              name
            }
            likes {
              commentId
              authorId
            }
            author {
              id
              name
              picture {
                filePath
              }
            }
            createdAt
          }
        }
        pageInfo {
          currentPage
          hasNextPage
        }
      }
    }
  `;
  const variables = details;
  const response = await api.request(query, variables);

  return response.comments as Paginated<Comment>;
};

export const createComment = async (details: CreateCommentDetails) => {
  const query = gql`
    mutation CreateComment($details: CreateCommentInput!) {
      createComment(details: $details) {
        id
        content
        createdAt
        parent
        author {
          id
          name
          picture {
            filePath
          }
        }
        likes {
          authorId
          commentId
        }
      }
    }
  `;
  const variables = {
    details,
  };
  const response = await api.request(query, variables);
  return { ...response.createComment, children: [] } as Comment;
};
export const replyToComment = async (details: ReplyToCommentDetails) => {
  const query = gql`
    mutation ReplyToComment($details: ReplyToCommentInput!) {
      replyToComment(details: $details) {
        id
        content
        createdAt
        parent
        replyTo
        author {
          id
          name
          picture {
            filePath
          }
        }
        replyUser {
          name
          id
        }
        likes {
          authorId
          commentId
        }
      }
    }
  `;
  const variables = {
    details,
  };
  const response = await api.request(query, variables);
  return { ...response.replyToComment, children: [] } as Comment;
};
export const likeComment = async (details: LikeCommentDetails) => {
  const query = gql`
    mutation LikeComment($details: LikeCommentInput!) {
      likeComment(details: $details) {
        authorId
        commentId
      }
    }
  `;
  const variables = {
    details,
  };
  const response = await api.request(query, variables);
  return response.likeComment as CommentLike;
};

export const deleteComment = async (details: DeleteCommentDetails) => {
  const query = gql`
    mutation DeleteComment($details: DeleteCommentInput!) {
      deleteComment(details: $details) {
        id
      }
    }
  `;
  const variables = {
    details,
  };
  const response = await api.request(query, variables);
  return response.deleteComment as { id: number };
};
