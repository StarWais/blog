import { Box, Divider } from '@chakra-ui/react';
import { Comment } from '../../types/Post';
import CommentsList from './CommentsList';
import CreateCommentForm, { CreateCommentFormProps } from './CreateCommentForm';

interface CommentsBlockProps extends CreateCommentFormProps {
  comments: Comment[];
}

const CommentsBlock = ({
  comments,
  onSubmit,
  isLoading,
}: CommentsBlockProps) => {
  return (
    <Box mt={8}>
      <Box fontWeight="bold" mb={4}>
        {comments.length} comments
      </Box>
      <Divider />
      <CreateCommentForm onSubmit={onSubmit} isLoading={isLoading} />
      <CommentsList comments={comments} />
    </Box>
  );
};

export default CommentsBlock;
