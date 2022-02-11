import { HStack } from '@chakra-ui/react';
import moment from 'moment';
import { FaClock, FaComment, FaRegImages, FaThumbsUp } from 'react-icons/fa';
import ProfileStat from './ProfileStat';
import { ProfileProps } from './ProfileTopContent';

const ProfileStats = ({ profile }: ProfileProps) => {
  const { likesCount, commentsCount, lastActivedAt, postsCount } = profile;
  return (
    <HStack justify="space-between" mt={16} mb={20}>
      <ProfileStat
        icon={<FaThumbsUp size={30} />}
        title={`${likesCount} likes`}
        description="Total up votes"
      />
      <ProfileStat
        icon={<FaRegImages size={30} />}
        title={`${postsCount} posts`}
        description="Total posts"
      />
      <ProfileStat
        icon={<FaComment size={30} />}
        title={`${commentsCount} comments`}
        description="Total comments"
      />
      <ProfileStat
        icon={<FaClock size={30} />}
        title={moment(lastActivedAt).fromNow()}
        description="Last activity"
      />
    </HStack>
  );
};

export default ProfileStats;
