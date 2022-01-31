import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { Picture } from '../../types/Picture';
import { getUploadUrl } from '../../utils/helpers';
import { PostType } from './index';

interface PostImageProps {
  picture: Picture;
  postType: PostType;
}

const PostImage = ({ postType, picture }: PostImageProps) => {
  const getImageHeight = () => {
    if (postType === 'large') {
      return '350px';
    }
    if (postType === 'extralarge') {
      return '500px';
    }
    return '250px';
  };
  return (
    <Box
      position="relative"
      h={getImageHeight()}
      w={postType === 'normal' ? 'full' : '50%'}
    >
      <Image layout="fill" src={getUploadUrl(picture)} alt="post picture" />
    </Box>
  );
};

export default PostImage;
