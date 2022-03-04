import { gql } from 'graphql-request';
import api from '../api/fetcher';
import { Picture } from '../types/Picture';
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

export interface ChangePasswordDetails {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateAvatarDetails {
  pictureId: number;
}
export interface UpdateMeDetails {
  name: string;
  description?: string;
  email?: string;
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
          description
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
        description
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

export const updateAvatar = async ({ pictureId }: UpdateAvatarDetails) => {
  const query = gql`
    mutation UpdateAvatar($details: UpdateUserAvatarInput!) {
      updateMyAvatar(details: $details) {
        filePath
      }
    }
  `;
  const variables = {
    details: {
      pictureId,
    },
  };
  const response = await api.request(query, variables);
  return response.updateMyAvatar as Picture;
};

export const updateMe = async (details: UpdateMeDetails) => {
  const query = gql`
    mutation UpdateUser($details: UpdateUserInput!) {
      updateUser(details: $details) {
        id
        email
        name
        description
        role
        picture {
          filePath
        }
      }
    }
  `;
  const variables = {
    details,
  };
  const response = await api.request(query, variables);
  return response.updateUser as User;
};

export const emailExists = async (email: string) => {
  const query = gql`
    query EmailExists($email: String!) {
      emailExists(email: $email)
    }
  `;
  const variables = {
    email,
  };
  const response = await api.request(query, variables);
  return response.emailExists as boolean;
};

export const changePassword = async (
  changePasswordDetails: ChangePasswordDetails
) => {
  console.log(changePasswordDetails);
  const query = gql`
    mutation ChangePassword($changePasswordDetails: ChangePasswordInput!) {
      changePassword(changePasswordDetails: $changePasswordDetails) {
        id
      }
    }
  `;
  const variables = {
    changePasswordDetails,
  };

  const response = await api.request(query, variables);
  return response.changePassword as {
    id: number;
  };
};
