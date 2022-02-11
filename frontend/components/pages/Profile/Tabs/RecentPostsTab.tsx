import { Box, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import { Post } from '../../../../types/Post';
import ProfileRecentPost from '../ProfileRecentPost';

interface RecentPostsTabProps {
  posts: Post[];
}

const RecentPostsTab: React.FC<RecentPostsTabProps> = ({ posts }) => {
  if (_.isEmpty(posts))
    return (
      <Box textAlign="center" fontSize="lg">
        There are no recent posts{' '}
      </Box>
    );
  return (
    <VStack spacing={8}>
      {posts.map((post) => (
        <ProfileRecentPost key={post.id} post={post} />
      ))}
    </VStack>
  );
};

export default RecentPostsTab;
