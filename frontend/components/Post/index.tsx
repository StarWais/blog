import { Flex } from '@chakra-ui/react';
import { Post as IPost } from '../../types/Post';
import PostContent from './PostContent';
import PostImage from './PostImage';

export type PostType = 'normal' | 'large' | 'extralarge';
interface PostProps {
  post: IPost;
  type: PostType;
  dashboardMode?: boolean;
}

const Post = ({ post, type, dashboardMode }: PostProps) => {
  return (
    <Flex
      w="full"
      direction={type === 'normal' ? 'column' : 'row-reverse'}
      as="article"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
      borderRadius="md"
    >
      <PostImage
        picture={post.picture}
        postId={post.id}
        postType={type}
        showPublished={dashboardMode}
        isPublishedPost={post.published}
      />
      <PostContent postType={type} post={post} dashboardMode={dashboardMode} />
    </Flex>
  );
};

export default Post;
