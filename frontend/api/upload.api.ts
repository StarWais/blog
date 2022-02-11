import { gql } from 'graphql-request';
import api from '../api/fetcher';
import { Picture } from '../types/Picture';

export const getMyUploads = async () => {
  const query = gql`
    query MyUploads {
      getMyUploads {
        id
        filePath
        fileName
        fileType
        fileSize
        filePath
      }
    }
  `;
  const response = await api.request(query);
  return response.getMyUploads as Picture[];
};

export const uploadFile = async (file: File) => {
  const query = gql`
    mutation UploadFile($file: Upload!) {
      uploadFile(file: $file) {
        id
        filePath
        fileName
        fileType
        fileSize
        filePath
      }
    }
  `;
  const response = await api.request(query, { file });
  return response.uploadFile as Picture;
};
