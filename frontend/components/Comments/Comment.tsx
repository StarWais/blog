import { Avatar, Box, HStack, VStack } from '@chakra-ui/react';
import Moment from 'react-moment';
import { Comment } from '../../types/Post';
import { getUploadUrl } from '../../utils/helpers';

interface CommentProps {
  comment: Comment;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <HStack alignItems="start" spacing={3}>
      <Avatar
        src={getUploadUrl(comment.author.picture)}
        name={comment.author.name}
      />
      <Box>
        <Box color="blue.600" fontWeight="bold">
          {comment.author.name}
        </Box>
        <Box whiteSpace="pre-line">{comment.content}</Box>
        <Box mt={2} fontSize="sm" color="gray.400">
          <Moment date={new Date(comment.createdAt)} fromNow />
        </Box>
      </Box>
    </HStack>
  );
};
export default Comment;
