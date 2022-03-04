import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Moment from 'react-moment';
import { PostType } from '.';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEditblePost } from '../../redux/posts/post.slice';
import { deletePost } from '../../redux/posts/post.thunks';
import { Post } from '../../types/Post';
import { getParsedContent } from '../../utils/helpers';
import NextLink from '../NextLink';

interface PostContentProps {
  post: Post;
  postType: PostType;
  dashboardMode?: boolean;
}

const PostContent = (props: PostContentProps) => {
  const { post, postType, dashboardMode } = props;
  const { title, content, slug, createdAt } = post;
  const dispatch = useAppDispatch();
  const deletingPostId = useAppSelector((state) => state.posts.deletingPostId);
  const deletingPostState = useAppSelector((state) => state.posts.deletingPost);
  const toast = useToast();

  useEffect(() => {
    if (deletingPostState === 'succeeded') {
      toast({
        title: 'Deleted!',
        status: 'success',
        isClosable: true,
      });
    }
  }, [deletingPostState]);

  const getTitleSize = () => {
    if (postType === 'large') {
      return '3xl';
    }
    if (postType === 'extralarge') {
      return '4xl';
    }
    return 'xl';
  };
  const getContentPadding = () => {
    if (postType === 'large') {
      return 8;
    }
    if (postType === 'extralarge') {
      return 14;
    }
    return 5;
  };
  return (
    <VStack
      align="start"
      justify="space-between"
      bg={postType === 'extralarge' ? 'gray.50' : 'white'}
      w={postType === 'normal' ? 'full' : '50%'}
      flexGrow={1}
      p={getContentPadding()}
    >
      <VStack
        spacing={postType === 'normal' ? 4 : 8}
        align="start"
        mb={postType === 'normal' ? 5 : 0}
      >
        <Box fontSize={getTitleSize()} fontWeight="bold">
          {title}
        </Box>
        <Box color="gray.500">{getParsedContent(content)}</Box>
      </VStack>
      <HStack justify="space-between" w="full">
        <Moment date={new Date(createdAt)} format="MMM Do YYYY" />
        {dashboardMode ? (
          <ButtonGroup variant="ghost">
            <Button onClick={() => dispatch(setEditblePost(post))}>Edit</Button>
            <IconButton
              aria-label="Remove post"
              icon={<FaTrashAlt />}
              onClick={() => dispatch(deletePost(post.id))}
              isLoading={
                deletingPostState === 'pending' && deletingPostId === post.id
              }
            />
          </ButtonGroup>
        ) : (
          <NextLink fontWeight="bold" href={`/articles/${slug}`}>
            Read More
          </NextLink>
        )}
      </HStack>
    </VStack>
  );
};

export default PostContent;
