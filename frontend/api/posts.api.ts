import { Post } from '../types/Post';
import { gql } from 'graphql-request';
import api from '../api/fetcher';
import { Paginated, PaginationDetails } from '../types/Pagination';

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
  return response.publishedPosts as Paginated<Post>;
};
export const getPostBySlug = async (slug: string) => {
  const query = gql`
    query Post($slug: String) {
      post(slug: $slug) {
        id
        author {
          id
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
  const publishedPosts = response.publishedPosts as Paginated<Post>;
  return publishedPosts.nodes.map((post) => post.slug);
};
