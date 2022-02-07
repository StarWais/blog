import { Box, Container } from '@chakra-ui/react';
import { GetStaticPaths, NextPage } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import Head from 'next/head';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import PostInformation from '../../components/pages/Post/PostInformation';
import { getSlugs } from '../../api/posts.api';
import { Post } from '../../types/Post';
import { getUploadUrl } from '../../utils/helpers';
import { wrapper } from '../../redux/store';
import { getPostBySlug } from '../../redux/posts/post.thunks';
import { useAppSelector } from '../../hooks';
import { getCurrentPost } from '../../redux/posts/posts.selectors';
import PostComments from '../../components/pages/Post/PostComments';

interface IParams extends NextParsedUrlQuery {
  slug: string;
}

const Post: NextPage = () => {
  const post = useAppSelector(getCurrentPost);
  const router = useRouter();

  useEffect(() => {
    if (!post) router.push('/404');
  }, [post]);

  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container maxW="8xl" mt={10}>
        <Box position="relative" h="lg" w="full">
          <Image
            alt="post image"
            src={getUploadUrl(post.picture)}
            layout="fill"
          />
        </Box>
      </Container>
      <Container maxW="6xl">
        <PostInformation post={post} />
        <ReactMarkdown components={ChakraUIRenderer()}>
          {post.content}
        </ReactMarkdown>
        <PostComments post={post} />
      </Container>
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async ({ params }) => {
      const { slug } = params as IParams;
      await dispatch(getPostBySlug(slug));
      return {
        props: {},
        revalidate: 10000,
      };
    }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: 'blocking' };
};

export default Post;
