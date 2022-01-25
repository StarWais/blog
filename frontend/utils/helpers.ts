import { Picture } from './../types/Picture.d';

export const getPostPictureUrl = (picture: Picture) => {
  return `${process.env.NEXT_PUBLIC_SERVER_URL}${picture.filePath}`;
};
