import { Box, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import { Comment } from '../../../../types/Comment';
import ProfileRecentComment from '../ProfileRecentComment';

interface RecentCommentsTabProps {
  comments: Comment[];
}

const RecentCommentsTab = ({ comments }: RecentCommentsTabProps) => {
  if (_.isEmpty(comments))
    return (
      <Box textAlign="center" fontSize="lg">
        There are no recent comments{' '}
      </Box>
    );
  return (
    <VStack spacing={8}>
      {comments.map((comment) => (
        <ProfileRecentComment key={comment.id} comment={comment} />
      ))}
    </VStack>
  );
};

export default RecentCommentsTab;
