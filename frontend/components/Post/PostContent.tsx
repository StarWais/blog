import { Box, HStack, VStack } from '@chakra-ui/react';
import Moment from 'react-moment';
import { PostType } from '.';
import { getParsedContent } from '../../utils/helpers';
import NextLink from '../NextLink';

interface PostContentProps {
  title: string;
  content: string;
  slug: string;
  createdAt: number;
  postType: PostType;
}

const PostContent = ({
  postType,
  title,
  content,
  slug,
  createdAt,
}: PostContentProps) => {
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
        <NextLink fontWeight="bold" href={`/articles/${slug}`}>
          Read more
        </NextLink>
      </HStack>
    </VStack>
  );
};

export default PostContent;
