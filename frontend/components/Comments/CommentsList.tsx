import { VStack } from '@chakra-ui/react';
import _ from 'lodash';
import { Comment } from '../../types/Post';
import CommentElement from './Comment';

interface CommentsListProps {
  comments: Comment[];
}
const CommentsList = ({ comments }: CommentsListProps) => {
  if (_.isEmpty(comments)) return null;
  return (
    <VStack spacing={5} alignItems="start" mt={12}>
      {comments.map((comment) => (
        <CommentElement comment={comment} key={comment.id} />
      ))}
    </VStack>
  );
};

export default CommentsList;
