import { Container, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Post as IPost } from '../../../types/Post';
import Post from '../../Post';

interface PostsProps {
  posts: IPost[];
}

const MainPagePosts: FC<PostsProps> = ({ posts }) => {
  return (
    <Container maxW="8xl" mx="auto" mt={10}>
      {posts.length > 0 ? (
        <VStack spacing={10}>
          <Post type="large" post={posts[0]} />
          <SimpleGrid columns={3} spacing={6} w="full">
            {posts.slice(1, 4).map((post) => (
              <Post key={post.id} type="normal" post={post} />
            ))}
          </SimpleGrid>
          {Boolean(posts[4]) && <Post type="extralarge" post={posts[4]} />}
        </VStack>
      ) : (
        <Heading as="h3" textAlign="center">
          There are no posts availiable
        </Heading>
      )}
    </Container>
  );
};

export default MainPagePosts;
