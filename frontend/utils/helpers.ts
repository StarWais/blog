import _ from 'lodash';
import removeMd from 'remove-markdown';
import { Picture } from './../types/Picture.d';

export const getUploadUrl = (picture: Picture | null | undefined) => {
  if (!picture) return '';
  return `${process.env.NEXT_PUBLIC_SERVER_URL}${picture.filePath}`;
};

export const getParsedContent = (content: string) => {
  const parsedContent = removeMd(content);
  return parsedContent.length > 250
    ? `${parsedContent.slice(0, 250)}...`
    : parsedContent;
};

export const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};
