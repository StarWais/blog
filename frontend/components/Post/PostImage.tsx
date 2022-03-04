import { Box, Button } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { publishPost } from '../../redux/posts/post.thunks';
import { Picture } from '../../types/Picture';
import { getUploadUrl } from '../../utils/helpers';
import { PostType } from './index';

interface PostImageProps {
  picture: Picture;
  postId: number;
  postType: PostType;
  showPublished?: boolean;
  isPublishedPost?: boolean;
}

const PostImage = ({
  postType,
  picture,
  postId,
  showPublished,
  isPublishedPost,
}: PostImageProps) => {
  const getImageHeight = () => {
    if (postType === 'large') {
      return '350px';
    }
    if (postType === 'extralarge') {
      return '500px';
    }
    return '250px';
  };
  const uploadingState = useAppSelector((state) => state.posts.publishingPost);
  const publishingPostId = useAppSelector(
    (state) => state.posts.publishingPostId
  );
  const dispatch = useAppDispatch();
  return (
    <Box
      position="relative"
      h={getImageHeight()}
      w={postType === 'normal' ? 'full' : '50%'}
    >
      <Image layout="fill" src={getUploadUrl(picture)} alt="post picture" />
      {showPublished && !isPublishedPost && (
        <Button
          position="absolute"
          colorScheme="red"
          p={2}
          rounded="lg"
          fontWeight="semibold"
          top={4}
          isLoading={
            uploadingState === 'pending' && publishingPostId === postId
          }
          onClick={() => dispatch(publishPost(postId))}
          right={4}
        >
          UNPUBLISHED
        </Button>
      )}
    </Box>
  );
};

export default PostImage;
