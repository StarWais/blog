import { PaginatedPosts } from '../types/Post';
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
