import { Post } from '../types/Post';
import { gql } from 'graphql-request';
import api from '../api/fetcher';
import { Paginated, PaginationDetails } from '../types/Pagination';

export interface CreatePostInput {
  content: string;
  title: string;
  pictureId: number;
}

export interface UpdatePostInput {
  details: Partial<CreatePostInput>;
  updatePostId: number;
}

export interface GetPublishedPostsArgs {
  page: number;
  limit: number;
  searchText?: string;
}

export const createPost = async (input: CreatePostInput) => {
  const query = gql`
    mutation CreatePost($details: CreatePostInput!) {
      createPost(details: $details) {
        content
        createdAt
        id
        published
        slug
        title
        picture {
          fileName
          id
          filePath
          fileType
        }
      }
    }
  `;
  const variables = {
    details: input,
  };

  const response = await api.request(query, variables);
  return response.createPost as Post;
};
export const updatePost = async (input: UpdatePostInput) => {
  const query = gql`
    mutation UpdatePost($details: UpdatePostInput!, $updatePostId: Int!) {
      updatePost(details: $details, id: $updatePostId) {
        content
        createdAt
        id
        published
        slug
        title
        picture {
          id
          fileName
          filePath
          fileType
        }
      }
    }
  `;
  const variables = {
    details: input.details,
    updatePostId: input.updatePostId,
  };

  const response = await api.request(query, variables);
  return response.updatePost as Post;
};
export const paginatePublishedPosts = async ({
  page,
  limit,
  searchText,
}: GetPublishedPostsArgs) => {
  const query = gql`
    query PublishedPosts($limit: Int, $page: Int!, $searchText: String) {
      publishedPosts(limit: $limit, page: $page, searchText: $searchText) {
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
    searchText,
    limit,
  };
  const response = await api.request(query, variables);
  return response.publishedPosts as Paginated<Post>;
};
export const paginateMyPosts = async ({ page, limit }: PaginationDetails) => {
  const query = gql`
    query MyPosts($limit: Int, $page: Int!) {
      myPosts(limit: $limit, page: $page) {
        nodes {
          title
          id
          slug
          createdAt
          published
          content
          picture {
            filePath
            id
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
  return response.myPosts as Paginated<Post>;
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
export const publishPost = async (id: number) => {
  const query = gql`
    mutation Publish($id: Int) {
      publish(id: $id) {
        id
      }
    }
  `;
  const variables = {
    id,
  };
  const response = await api.request(query, variables);
  return response.publish as {
    id: number;
  };
};
export const deletePost = async (id: number) => {
  const query = gql`
    mutation DeletePost($deletePostId: Int!) {
      deletePost(id: $deletePostId) {
        id
      }
    }
  `;
  const variables = {
    deletePostId: id,
  };
  const response = await api.request(query, variables);
  return response.deletePost as {
    id: number;
  };
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
