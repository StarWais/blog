import { Box, Heading, Text } from '@chakra-ui/react';
import Moment from 'react-moment';
import { Comment } from '../../../types/Comment';
import NextLink from '../../NextLink';

interface ProfileRecentCommentProps {
  comment: Comment;
}

const ProfileRecentComment = ({ comment }: ProfileRecentCommentProps) => {
  return (
    <Box shadow="md" p={5} w="full" rounded="xl">
      <Heading as="h3" size="sm" mb={2} fontWeight="normal">
        Comment to{' '}
        <NextLink href={`/articles/${comment.post.slug}`} fontWeight="semibold">
          {comment.post.title}
        </NextLink>
      </Heading>
      <Text color="gray.600" my={4}>
        {comment.content}
      </Text>
      <Box fontSize="xs">
        <Moment date={new Date(comment.createdAt)} fromNow />
      </Box>
    </Box>
  );
};

export default ProfileRecentComment;
