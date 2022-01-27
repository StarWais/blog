import { Box, Container } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import Head from 'next/head';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import PostInformation from '../../components/pages/Post/PostInformation';
import { getPostBySlug, getSlugs } from '../../services/posts.api';
import { Post } from '../../types/Post';
import { getPostPictureUrl } from '../../utils/helpers';

interface PostPageProps {
  post: Post;
}
interface IParams extends NextParsedUrlQuery {
  slug: string;
}

const Post = ({ post }: PostPageProps) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container maxW="8xl" mt={10}>
        <Box position="relative" h="lg" w="full">
          <Image
            alt="post image"
            src={getPostPictureUrl(post.picture)}
            layout="fill"
          />
        </Box>
      </Container>
      <Container maxW="6xl">
        <PostInformation post={post} />

        {/* prettier-ignore */}
        <ReactMarkdown components={ChakraUIRenderer()} >
				{post.content}
        </ReactMarkdown>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  try {
    const post = await getPostBySlug(slug);
    return {
      props: {
        post,
      },
      revalidate: 1000,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: 'blocking' };
};

export default Post;
