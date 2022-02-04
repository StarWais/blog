import { gql } from 'graphql-request';
import api from '../api/fetcher';
import { User } from '../types/User';

export interface SignUpDetails {
  email: string;
  password: string;
  name: string;
}
export interface LogInDetails {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const signUp = async ({ email, password, name }: SignUpDetails) => {
  const query = gql`
    mutation SignUp($signupDetails: SignUpInput!) {
      signUp(signupDetails: $signupDetails) {
        accessToken
        refreshToken
        user {
          id
          email
          role
          name
          picture {
            filePath
          }
        }
      }
    }
  `;
  const variables = {
    signupDetails: {
      email,
      password,
      name,
    },
  };
  const response = await api.request(query, variables);
  return response.signUp as AuthResponse;
};
export const logIn = async ({ email, password }: LogInDetails) => {
  const query = gql`
    mutation LogIn($loginDetails: LoginInput!) {
      logIn(loginDetails: $loginDetails) {
        accessToken
        refreshToken
        user {
          id
          name
          email
          role
          picture {
            filePath
          }
        }
      }
    }
  `;
  const variables = {
    loginDetails: {
      email,
      password,
    },
  };
  const response = await api.request(query, variables);
  return response.logIn as AuthResponse;
};
export const getMe = async () => {
  const query = gql`
    query GetMe {
      getMe {
        id
        email
        name
        role
        picture {
          filePath
        }
      }
    }
  `;
  const response = await api.request(query);
  return response.getMe as User;
};
