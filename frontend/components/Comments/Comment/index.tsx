import { Avatar, Box, Button, HStack, IconButton } from '@chakra-ui/react';
import { FaThumbsUp } from 'react-icons/fa';
import Moment from 'react-moment';
import _ from 'lodash';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCurrentUser } from '../../../redux/auth/auth.selectors';
import { setReplyingComment } from '../../../redux/comments/post/post-comments.slice';
import { getUploadUrl } from '../../../utils/helpers';
import CommentsList from '../CommentsList';
import CreateCommentForm, { CommentFormInputs } from '../CreateCommentForm';
import { Comment } from '../../../types/Comment';
import NextLink from '../../NextLink';
import CommentMenu from './CommentMenu';
import { Role } from '../../../types/User.d';

interface CommentProps extends CommentActions {
  comment: Comment;
}

export interface CommentActions {
  onLike: (commentId: number) => void;
  onDislike: (commentId: number) => void;
  onDelete: (commentId: number) => void;
  onReply: (data: ReplyFormInputs) => void;
  isReplying: boolean;
  isDeleting: boolean;
}

export interface ReplyFormInputs extends CommentFormInputs {
  replyTo: number;
}

const CommentElement = (props: CommentProps) => {
  const { comment, ...rest } = props;
  const { onLike, onReply, onDislike, isReplying, onDelete, isDeleting } = rest;
  const currentReplyingComment = useAppSelector(
    (state) => state.postComments.replyingTo
  );
  const user = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const likedByUser = comment.likes.some((like) => like.authorId === user?.id);
  const isAuthor = comment.author.id === user?.id || user?.role === Role.ADMIN;
  const handleLike = () => {
    if (likedByUser) {
      onDislike(comment.id);
    } else {
      onLike(comment.id);
    }
  };
  const handleReply = (data: CommentFormInputs) => {
    onReply({ ...data, replyTo: comment.id });
  };
  return (
    <HStack alignItems="start" spacing={3} w="100%">
      <Avatar
        src={getUploadUrl(comment.author.picture)}
        name={comment.author.name}
      />
      <Box w="100%">
        <HStack w="100%">
          <NextLink
            href={`/profile/${comment.author.id}`}
            color="blue.600"
            fontWeight="bold"
          >
            {comment.author.name}
          </NextLink>
          <Box mt={2} fontSize="xs" color="gray.400">
            <Moment date={new Date(comment.createdAt)} fromNow />
          </Box>
        </HStack>
        <Box whiteSpace="pre-line">
          {comment.replyTo && (
            <NextLink
              href={`/profile/${comment?.replyUser?.id}`}
              fontWeight="semibold"
              mr={1}
              color="blue.600"
            >
              @{comment?.replyUser?.name}
            </NextLink>
          )}
          {comment.content}
        </Box>
        <HStack w="100%">
          <HStack>
            <IconButton
              aria-label="Add or remove like to a comment"
              size="sm"
              variant="ghost"
              disabled={!user}
              onClick={handleLike}
              icon={<FaThumbsUp color={likedByUser ? 'blue' : 'black'} />}
            />
            <Box fontSize="sm">{comment.likes.length}</Box>
          </HStack>
          {user && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => dispatch(setReplyingComment(comment.id))}
            >
              Reply
            </Button>
          )}
        </HStack>
        {currentReplyingComment === comment.id && (
          <CreateCommentForm
            onSubmit={handleReply}
            isLoading={isReplying}
            placeholder={`Add a reply to ${comment.author.name}...`}
            withButtons
            comfirmButtonText="Reply"
            onCancel={() => dispatch(setReplyingComment(null))}
          />
        )}

        <CommentsList comments={comment.children} {...rest} />
      </Box>
      <CommentMenu
        id={comment.id}
        onDelete={onDelete}
        isDeleting={isDeleting}
        isAuthor={isAuthor}
      />
    </HStack>
  );
};
export default CommentElement;
