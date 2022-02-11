import { gql } from 'graphql-request';
import api from '../api/fetcher';
import { Profile } from '../types/User';

export interface GetProfileDetails {
  id: number;
}

export const getProfile = async ({ id }: GetProfileDetails) => {
  const query = gql`
    query GetProfile($id: Int!) {
      getProfile(id: $id) {
        id
        name
        description
        likesCount
        commentsCount
        lastActivedAt
        postsCount
        picture {
          filePath
        }
        recentPosts {
          id
          slug
          title
          content
          createdAt
          likesCount
          commentsCount
          author {
            name
          }
        }
        recentComments {
          id
          createdAt
          content
          author {
            name
          }
          post {
            slug
            title
          }
        }
      }
    }
  `;
  const variables = {
    id,
  };
  const response = await api.request(query, variables);
  return response.getProfile as Profile;
};
