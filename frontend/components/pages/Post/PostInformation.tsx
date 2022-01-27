import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import Moment from 'react-moment';
import { Post } from '../../../types/Post';

interface PostInformationProps {
  post: Post;
}

const PostInformation = ({ post }: PostInformationProps) => {
  return (
    <Box my={10} pb={6} borderBottomColor="gray.400" borderBottomWidth="1px">
      <Heading as="h1" fontWeight="bold" fontSize="4xl">
        {post.title}
      </Heading>
      <HStack mt={3}>
        <Text fontWeight="bold">Written by {post.author.name}</Text>
        <Box color="gray.500">
          <Moment date={new Date(post.createdAt)} format="LLLL" />
        </Box>
      </HStack>
    </Box>
  );
};

export default PostInformation;
