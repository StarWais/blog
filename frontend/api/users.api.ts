import { gql } from 'graphql-request';
import api from '../api/fetcher';
import { Profile, User } from '../types/User';

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
export interface GetAllUsersArgs {
  page: number;
  limit: number;
}
export const getAllUsers = async (args: GetAllUsersArgs) => {
  const query = gql`
    query GetAllUsers($page: Int, $limit: Int) {
      getAllUsers(page: $page, limit: $limit) {
        id
        name
        email
        createdAt
        picture {
          filePath
        }
      }
    }
  `;
  const variables = {
    page: args.page,
    limit: args.limit,
  };
  const response = await api.request(query, variables);
  return response.getAllUsers as User[];
};
