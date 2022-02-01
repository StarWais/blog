import { Comment, CommentLike, PaginatedPosts, Post } from '../types/Post';
import { gql } from 'graphql-request';
import api from '../utils/api';
import { defer } from 'lodash';

interface PaginationDetails {
  page: number;
  limit: number;
}
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

export const paginatePublishedPosts = async ({
  page,
  limit,
}: PaginationDetails) => {
  const query = gql`
    query PublishedPosts($limit: Int, $page: Int!) {
      publishedPosts(limit: $limit, page: $page) {
        nodes {
          title
          id
          slug
          createdAt
          content
          picture {
            filePath
          }
        }
        pageInfo {
          currentPage
          hasNextPage
        }
      }
    }
  `;
  const variables = {
    page,
    limit,
  };
  const response = await api.request(query, variables);
  return response.publishedPosts as PaginatedPosts;
};
export const getPostBySlug = async (slug: string) => {
  const query = gql`
    query Post($slug: String) {
      post(slug: $slug) {
        id
        author {
          name
        }
        content
        createdAt
        picture {
          filePath
        }
        title
        updatedAt
        comments {
          id
          content
          createdAt
          replyTo
          author {
            name
            picture {
              filePath
            }
          }
          likes {
            authorId
          }
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const response = await api.request(query, variables);
  return response.post as Post;
};
export const getSlugs = async () => {
  const query = gql`
    query PublishedPosts($limit: Int, $page: Int!) {
      publishedPosts(limit: $limit, page: $page) {
        nodes {
          slug
        }
      }
    }
  `;
  const variables = {
    page: 1,
    limit: 100000000,
  };
  const response = await api.request(query, variables);
  const publishedPosts = response.publishedPosts as PaginatedPosts;
  return publishedPosts.nodes.map((post) => post.slug);
};
export const createComment = async (details: CreateCommentDetails) => {
  const query = gql`
    mutation CreateComment($details: CreateCommentInput!) {
      createComment(details: $details) {
        id
        content
        createdAt
        replyTo
        author {
          name
          picture {
            filePath
          }
        }
      }
    }
  `;
  const variables = {
    details,
  };
  const response = await api.request(query, variables);
  return response.createComment as Comment;
};
export const replyToComment = async (details: ReplyToCommentDetails) => {
  const query = gql`
    mutation ReplyToComment($details: ReplyToCommentInput!) {
      replyToComment(details: $details) {
        content
        createdAt
        id
        author {
          name
          picture {
            filePath
          }
        }
        replyTo
      }
    }
  `;
  const variables = {
    details,
  };
  const response = await api.request(query, variables);
  return response.createComment as Comment;
};
export const likeComment = async (details: LikeCommentDetails) => {
  const query = gql`
    mutation LikeComment($details: LikeCommentInput!) {
      likeComment(details: $details) {
        authorId
      }
    }
  `;
  const variables = {
    details,
  };
  const response = await api.request(query, variables);
  return response.likeComment as CommentLike;
};
