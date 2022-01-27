import { PaginatedPosts, Post } from '../types/Post';
import { gql } from 'graphql-request';
import api from '../utils/api';

interface PaginationDetails {
  page: number;
  limit: number;
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
