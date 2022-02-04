import { VStack } from '@chakra-ui/react';
import _ from 'lodash';
import { Comment } from '../../types/Comment';
import CommentElement, { CommentActions } from './Comment';

interface CommentsListProps extends CommentActions {
  comments: Comment[];
}
const CommentsList = ({ comments, ...rest }: CommentsListProps) => {
  if (!_.isArray || _.isEmpty(comments)) return null;
  return (
    <VStack spacing={5} alignItems="start" mt={6}>
      {comments.map((comment) => (
        <CommentElement comment={comment} key={comment.id} {...rest} />
      ))}
    </VStack>
  );
};

export default CommentsList;
