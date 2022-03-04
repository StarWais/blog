import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect } from 'react';
import _ from 'lodash';

import { paginatePublishedPosts } from '../../redux/posts/post.thunks';
import PostsList from '../../components/Post/PostsList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPageInfo } from '../../redux/posts/posts.selectors';
import { reset } from '../../redux/posts/post.slice';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PageProps } from '../_app';

const Articles: NextPage<PageProps> = () => {
  const dispatch = useAppDispatch();
  const pageInfo = useAppSelector(getPageInfo);
  const router = useRouter();
  const searchText = router.query.searchText as string | undefined;
  const handleFetchMore = async () =>
    await dispatch(
      paginatePublishedPosts({
        page: pageInfo.currentPage + 1,
        limit: 6,
        searchText,
      })
    );
  useEffect(() => {
    dispatch(reset());
    dispatch(paginatePublishedPosts({ page: 1, limit: 6, searchText }));
  }, [searchText]);
  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>
      <PostsList handleFetchMore={handleFetchMore} />
    </>
  );
};

export default Articles;
