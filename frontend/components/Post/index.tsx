import { Flex } from '@chakra-ui/react';
import { Post as IPost } from '../../types/Post';
import PostContent from './PostContent';
import PostImage from './PostImage';

export type PostType = 'normal' | 'large' | 'extralarge';
interface PostProps {
  post: IPost;
  type: PostType;
}

const Post = ({ post, type }: PostProps) => {
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
      <PostImage picture={post.picture} postType={type} />
      <PostContent postType={type} {...post} />
    </Flex>
  );
};

export default Post;
