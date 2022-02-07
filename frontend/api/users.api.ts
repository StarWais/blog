import { gql } from 'graphql-request';
import api from '../api/fetcher';
import { User } from '../types/User';

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
        picture {
          filePath
        }
      }
    }
  `;
  const variables = {
    id,
  };
  const response = await api.request(query, variables);
  return response.getProfile as User;
};
