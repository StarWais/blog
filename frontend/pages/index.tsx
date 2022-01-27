import type { NextPage } from 'next';
import Head from 'next/head';
import MainPagePosts from '../components/pages/Home/MainPagePosts';
import TopContent from '../components/pages/Home/TopContent';
import { useAppSelector } from '../hooks';
import { paginatePublishedPosts } from '../redux/posts/post.thunks';
import { getPosts } from '../redux/posts/posts.selectors';
import { wrapper } from '../redux/store';
import { PageProps } from './_app';

const Home: NextPage<PageProps> = () => {
  const posts = useAppSelector(getPosts);

  return (
    <>
      <Head>
        <title>HotCoffee</title>
      </Head>
      <TopContent
        title="Make better coffee"
        description="why learn how to blog?"
        imageLink="/mainpage-top.svg"
      />
      <MainPagePosts posts={posts} />
    </>
  );
};
export const getStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async () => {
      await dispatch(paginatePublishedPosts({ page: 1, limit: 5 }));
      return {
        props: {},
        revalidate: 1000,
      };
    }
);
export default Home;
