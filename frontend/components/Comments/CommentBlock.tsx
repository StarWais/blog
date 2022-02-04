import { Box, Button, Center, Divider, Spinner } from '@chakra-ui/react';
import _ from 'lodash';
import { Comment } from '../../types/Comment';
import { CommentActions } from './Comment';
import CommentsList from './CommentsList';
import CreateCommentForm, { CommentFormInputs } from './CreateCommentForm';

export interface FetchingCommentsActions {
  isFetchingMore?: boolean;
  hasMore?: boolean;
  fetchMore?: () => void;
}

interface CommentsBlockProps extends CommentActions, FetchingCommentsActions {
  comments: Comment[];
  onSubmit: (data: CommentFormInputs) => void;
  isCommenting: boolean;
  isLoading: boolean;
}

const CommentsBlock = ({
  comments,
  onSubmit,
  isCommenting,
  isLoading,
  hasMore,
  fetchMore,
  isFetchingMore,
  ...rest
}: CommentsBlockProps) => {
  if (isLoading)
    return (
      <Center mt={8}>
        <Spinner color="blue.500" size="lg" />
      </Center>
    );
  return (
    <Box mt={8}>
      <Box fontWeight="bold" mb={4}>
        {comments.length} comments
      </Box>
      <Divider />
      <CreateCommentForm onSubmit={onSubmit} isLoading={isCommenting} />
      <CommentsList comments={comments} {...rest} />
      {hasMore && (
        <Center>
          <Button
            isLoading={isFetchingMore}
            onClick={fetchMore}
            colorScheme="blue"
            variant="ghost"
          >
            Load more
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default CommentsBlock;
