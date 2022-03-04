import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC } from 'react';
import Post from '.';
import { useAppSelector } from '../../hooks';
import {
  getPageInfo,
  getPosts,
  isFetchingPosts,
} from '../../redux/posts/posts.selectors';

interface PostsListProps {
  handleFetchMore: () => void;
  dashboardMode?: boolean;
}

const PostsList: FC<PostsListProps> = ({
  handleFetchMore,
  children,
  dashboardMode,
}) => {
  const posts = useAppSelector(getPosts);
  const pageInfo = useAppSelector(getPageInfo);
  const isFetching = useAppSelector(isFetchingPosts);

  return (
    <Container maxW="8xl" mx="auto" mt={10} px={10}>
      {children}
      {!_.isEmpty(posts) ? (
        <>
          <SimpleGrid columns={3} spacing={6} w="full">
            {posts.map((post) => (
              <Post
                post={post}
                key={post.id}
                type="normal"
                dashboardMode={dashboardMode}
              />
            ))}
          </SimpleGrid>
          {pageInfo.hasNextPage && (
            <Box ml="auto" maxW="fit-content">
              <Button
                isLoading={isFetching && !_.isEmpty(posts)}
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
      ) : !isFetching ? (
        <Heading as="h2" fontSize="2xl" textAlign="center">
          There are no posts availiable
        </Heading>
      ) : (
        <Center my={8}>
          <Spinner color="blue.500" size="lg" />
        </Center>
      )}
    </Container>
  );
};

export default PostsList;
