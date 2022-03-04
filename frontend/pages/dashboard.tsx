import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import { PageProps } from './_app';
import PostsList from '../components/Post/PostsList';
import { paginateMyPosts } from '../redux/posts/post.thunks';
import { useAppDispatch, useAppSelector } from '../hooks';
import { reset } from '../redux/posts/post.slice';
import { getPageInfo } from '../redux/posts/posts.selectors';
import Head from 'next/head';
import CreateEditPostModal from '../components/Modals/CreateEditPostModal';

const Dashboard: NextPage<PageProps> = () => {
  const dispatch = useAppDispatch();
  const pageInfo = useAppSelector(getPageInfo);
  const editablePost = useAppSelector((state) => state.posts.editablePost);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleFetchMore = async () =>
    await dispatch(
      paginateMyPosts({ page: pageInfo.currentPage + 1, limit: 6 })
    );
  useEffect(() => {
    dispatch(reset());
    dispatch(paginateMyPosts({ page: 1, limit: 6 }));
  }, []);

  useEffect(() => {
    if (editablePost) {
      onOpen();
    }
  }, [editablePost]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <PostsList handleFetchMore={handleFetchMore} dashboardMode>
        <Box ml="auto" maxW="fit-content">
          <Button colorScheme="purple" mb={6} onClick={onOpen}>
            Create new post
          </Button>
        </Box>
      </PostsList>
      {isOpen && <CreateEditPostModal onClose={onClose} isOpen={isOpen} />}
    </>
  );
};

Dashboard.defaultProps = {
  requiresAuth: true,
};

export default Dashboard;
