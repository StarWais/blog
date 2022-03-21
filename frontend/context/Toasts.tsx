import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks';

export default function Toasts() {
  const toast = useToast();
  const postDeleteState = useAppSelector((state) => state.posts.deletingPost);
  const commentDeleteState = useAppSelector(
    (state) => state.postComments.deletingComment
  );
  const postCreateUpdate = useAppSelector(
    (state) => state.posts.creatingUpdatingPost
  );
  const commentCreateState = useAppSelector(
    (state) => state.postComments.creatingComment
  );
  const userUpdateState = useAppSelector((state) => state.auth.isUpdatingUser);
  const avatarUpdateState = useAppSelector(
    (state) => state.auth.isUpdatingAvatar
  );
  const postPublishState = useAppSelector(
    (state) => state.posts.publishingPost
  );

  useEffect(() => {
    if (postDeleteState === 'succeeded') {
      toast({
        title: 'Post deleted',
        isClosable: true,
        status: 'success',
      });
    }
    if (postDeleteState === 'failed') {
      toast({
        title: 'Error while deleting post',
        isClosable: true,
        status: 'error',
      });
    }
  }, [postDeleteState]);

  useEffect(() => {
    if (commentDeleteState === 'succeeded') {
      toast({
        title: 'Comment deleted',
        isClosable: true,
        status: 'success',
      });
    }
    if (commentDeleteState === 'failed') {
      toast({
        title: 'Error while deleting comment',
        isClosable: true,
        status: 'error',
      });
    }
  }, [commentDeleteState]);

  useEffect(() => {
    if (postCreateUpdate === 'succeeded') {
      toast({
        title: 'Successfully created/updated post',
        isClosable: true,
        status: 'success',
      });
    }
    if (postCreateUpdate === 'failed') {
      toast({
        title: 'Error while creating/updating post',
        isClosable: true,
        status: 'error',
      });
    }
  }, [postCreateUpdate]);

  useEffect(() => {
    if (commentCreateState === 'succeeded') {
      toast({
        title: 'Successfully added comment',
        isClosable: true,
        status: 'success',
      });
    }
    if (commentCreateState === 'failed') {
      toast({
        title: 'Error while adding comment',
        isClosable: true,
        status: 'error',
      });
    }
  }, [commentCreateState]);

  useEffect(() => {
    if (userUpdateState === 'succeeded') {
      toast({
        title: 'Your data was updated',
        isClosable: true,
        status: 'success',
      });
    }
    if (userUpdateState === 'failed') {
      toast({
        title: 'Error while updating your data',
        isClosable: true,
        status: 'error',
      });
    }
  }, [userUpdateState]);

  useEffect(() => {
    if (avatarUpdateState === 'succeeded') {
      toast({
        title: 'Your avatar was updated',
        isClosable: true,
        status: 'success',
      });
    }
    if (avatarUpdateState === 'failed') {
      toast({
        title: 'Error while updating your avatar',
        isClosable: true,
        status: 'error',
      });
    }
  }, [avatarUpdateState]);
  useEffect(() => {
    if (postPublishState === 'succeeded') {
      toast({
        title: 'Your post was published',
        isClosable: true,
        status: 'success',
      });
    }
    if (postPublishState === 'failed') {
      toast({
        title: 'Error while publishing your post',
        isClosable: true,
        status: 'error',
      });
    }
  }, [postPublishState]);

  return null;
}
