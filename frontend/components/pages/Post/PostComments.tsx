import _ from 'lodash';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { reset } from '../../../redux/comments/post/post-comments.slice';
import {
  createPostComment,
  deletePostComment,
  dislikePostComment,
  likePostComment,
  paginatePostComments,
  replyToPostComment,
} from '../../../redux/comments/post/post-comments.thunks';
import { Post } from '../../../types/Post';
import { ReplyFormInputs } from '../../Comments/Comment';
import CommentsBlock from '../../Comments/CommentBlock';
import { CommentFormInputs } from '../../Comments/CreateCommentForm';

interface PostCommentsProps {
  post: Post;
}

const PostComments = ({ post }: PostCommentsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(
      paginatePostComments({
        postId: post.id,
        page: 1,
        limit: 10,
      })
    );
  }, [post]);

  const postComments = useAppSelector(
    (state) => state.postComments.paginatedResults.nodes
  );

  const isFetching = useAppSelector(
    (state) =>
      state.postComments.loadingComments === 'pending' &&
      _.isEmpty(state.postComments.paginatedResults.nodes)
  );

  const isFetchingMore = useAppSelector(
    (state) =>
      state.postComments.loadingComments === 'pending' &&
      state.postComments.paginatedResults.pageInfo.hasNextPage
  );

  const pageInfo = useAppSelector(
    (state) => state.postComments.paginatedResults.pageInfo
  );

  const isCreatingComment = useAppSelector(
    (state) => state.postComments.creatingComment === 'pending'
  );
  const isReplying = useAppSelector(
    (state) => state.postComments.replyingToComment === 'pending'
  );

  const isDeleting = useAppSelector(
    (state) => state.postComments.deletingComment === 'pending'
  );

  const handleAddComment = async (data: CommentFormInputs) => {
    await dispatch(
      createPostComment({
        postId: post.id,
        ...data,
      })
    );
  };
  const handleReply = async (data: ReplyFormInputs) => {
    await dispatch(
      replyToPostComment({
        postId: post.id,
        ...data,
      })
    );
  };
  const handleLike = async (commentId: number) => {
    await dispatch(
      likePostComment({
        commentId,
      })
    );
  };
  const handleDislike = async (commentId: number) => {
    await dispatch(
      dislikePostComment({
        commentId,
      })
    );
  };
  const handleDelete = async (commentId: number) => {
    await dispatch(
      deletePostComment({
        commentId,
      })
    );
  };
  const handleFetchMoreComments = async () => {
    await dispatch(
      paginatePostComments({
        postId: post.id,
        page: pageInfo.hasNextPage ? pageInfo.currentPage + 1 : 1,
        limit: 10,
      })
    );
  };

  return (
    <CommentsBlock
      comments={postComments}
      isLoading={isFetching}
      onSubmit={handleAddComment}
      onDislike={handleDislike}
      onReply={handleReply}
      isReplying={isReplying}
      isCommenting={isCreatingComment}
      onLike={handleLike}
      onDelete={handleDelete}
      isFetchingMore={isFetchingMore}
      fetchMore={handleFetchMoreComments}
      hasMore={pageInfo.hasNextPage}
      isDeleting={isDeleting}
    />
  );
};

export default PostComments;
