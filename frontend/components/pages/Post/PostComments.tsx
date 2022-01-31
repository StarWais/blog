import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createComment } from '../../../redux/posts/post.thunks';
import { Post } from '../../../types/Post';
import CommentsBlock from '../../Comments/CommentBlock';
import { CommentFormInputs } from '../../Comments/CreateCommentForm';

interface PostCommentsProps {
  post: Post;
}

const PostComments = ({ post }: PostCommentsProps) => {
  const dispatch = useAppDispatch();
  const isCreatingComment = useAppSelector(
    (state) => state.posts.creatingComment === 'pending'
  );

  const handleAddComment = async (data: CommentFormInputs) => {
    await dispatch(
      createComment({
        postId: post.id,
        ...data,
      })
    );
  };

  return (
    <CommentsBlock
      comments={post.comments}
      onSubmit={handleAddComment}
      isLoading={isCreatingComment}
    />
  );
};

export default PostComments;
