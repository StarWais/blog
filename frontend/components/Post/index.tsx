import { Post as IPost } from '../../types/Post';

interface PostProps {
  post: IPost;
  type: 'normal' | 'large' | 'extralarge';
}

const Post = ({ post, type }: PostProps) => {
  return null;
};

export default Post;
