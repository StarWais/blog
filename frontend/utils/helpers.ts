import { Picture } from './../types/Picture.d';

export const getUploadUrl = (picture: Picture | null | undefined) => {
  if (!picture) return '';
  return `${process.env.NEXT_PUBLIC_SERVER_URL}${picture.filePath}`;
};
