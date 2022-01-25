import { Box, Button, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import Post from '../../components/Post';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { paginatePublishedPosts } from '../../redux/posts/post.thunks';
import {
  getPageInfo,
  getPosts,
  isFetchingPosts,
} from '../../redux/posts/posts.selectors';
import { wrapper } from '../../redux/store';
import { PageProps } from '../_app';

const Articles: NextPage<PageProps> = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(getPosts);
  const pageInfo = useAppSelector(getPageInfo);
  const isFetching = useAppSelector(isFetchingPosts);
  const handleFetchMore = async () => {
    await dispatch(
      paginatePublishedPosts({ page: pageInfo.currentPage + 1, limit: 6 })
    );
  };
  return (
    <Container maxW="8xl" mx="auto" mt={10}>
      {posts.length > 0 ? (
        <>
          <SimpleGrid columns={3} spacing={6} w="full">
            {posts.map((post) => (
              <Post post={post} key={post.id} type="normal" />
            ))}
          </SimpleGrid>
          {pageInfo.hasNextPage && (
            <Box ml="auto" maxW="fit-content">
              <Button
                isLoading={isFetching}
                onClick={handleFetchMore}
                loadingText="Loading"
                colorScheme="purple"
                my={6}
              >
                See more
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Heading as="h2" fontSize="2xl" textAlign="center">
          There are no posts availiable
        </Heading>
      )}
    </Container>
  );
};
export const getStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async () => {
      await dispatch(paginatePublishedPosts({ page: 1, limit: 6 }));
      return {
        props: {},
        revalidate: 1000,
      };
    }
);

export default Articles;
