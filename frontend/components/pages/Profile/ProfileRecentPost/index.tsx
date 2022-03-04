import { Heading, HStack, LinkBox, Text } from '@chakra-ui/react';
import moment from 'moment';
import { FaClock, FaComment, FaThumbsUp, FaUser } from 'react-icons/fa';
import { Post } from '../../../../types/Post';
import { getParsedContent } from '../../../../utils/helpers';
import NextOverlayLink from '../../../NextOverlayLink';
import ProfileRecentPostStat from './ProfileRecentPostStat';

interface ProfileStatsProps {
  post: Post;
}

const ProfileRecentPost = ({ post }: ProfileStatsProps) => {
  return (
    <LinkBox as="article" shadow="md" p={8} rounded="lg" w="full">
      <Heading as="h3" size="md" fontWeight="semibold" mb={2}>
        <NextOverlayLink href={`/articles/${post.slug}`}>
          {post.title}
        </NextOverlayLink>
      </Heading>
      <Text color="gray.600" my={8}>
        {getParsedContent(post.content)}
      </Text>
      <HStack spacing={6}>
        <ProfileRecentPostStat
          icon={<FaClock />}
          text={moment(post.createdAt).format('MMMM DD, YYYY')}
        />
        <ProfileRecentPostStat icon={<FaUser />} text={post.author.name} />
        <ProfileRecentPostStat icon={<FaThumbsUp />} text={post.likesCount} />
        <ProfileRecentPostStat icon={<FaComment />} text={post.commentsCount} />
      </HStack>
    </LinkBox>
  );
};

export default ProfileRecentPost;
