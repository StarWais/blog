import { Avatar, Button, ButtonGroup, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { reset, setEditblePost } from '../../../redux/posts/post.slice';
import { deletePost, paginateAllPosts } from '../../../redux/posts/post.thunks';
import { getPageInfo } from '../../../redux/posts/posts.selectors';
import { Post } from '../../../types/Post';
import { getUploadUrl } from '../../../utils/helpers';
import CreateEditPostModal from '../../Modals/CreateEditPostModal';
import ReactTable from '../../Table';

export default function PostsTable() {
  const dispatch = useAppDispatch();
  const pageInfo = useAppSelector(getPageInfo);
  const editablePost = useAppSelector((state) => state.posts.editablePost);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleFetchMore = async () =>
    await dispatch(
      paginateAllPosts({ page: pageInfo.currentPage + 1, limit: 6 })
    );
  const posts = useAppSelector((state) => state.posts.paginatedResults.nodes);
  const router = useRouter();

  useEffect(() => {
    dispatch(reset());
    dispatch(paginateAllPosts({ page: 1, limit: 6 }));
  }, []);

  useEffect(() => {
    if (editablePost) {
      onOpen();
    }
  }, [editablePost]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Author',
        accessor: 'author.name',
      },
      {
        Header: 'Status',
        accessor: (post: Post) => (post.published ? 'Published' : 'Draft'),
      },
      {
        Header: 'Image',
        accessor: (post: Post) => (
          <Avatar
            name={`image of post ${post.id}`}
            src={getUploadUrl(post.picture)}
          />
        ),
      },
      {
        Header: 'Created at',
        accessor: (post: Post) => moment(post.createdAt).format('DD MMM YYYY'),
      },
      {
        Header: 'Actions',
        accessor: (post: Post) => (
          <ButtonGroup size="sm">
            <Button
              colorScheme="blue"
              onClick={() => dispatch(setEditblePost(post))}
            >
              Edit post
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => router.push(`/articles/${post.slug}`)}
            >
              {post.published ? 'View' : 'Preview'}
            </Button>
            <Button
              colorScheme="red"
              onClick={() => dispatch(deletePost(post.id))}
            >
              Delete
            </Button>
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  const tableData = React.useMemo(() => posts, [posts]);
  return (
    <>
      {isOpen && <CreateEditPostModal onClose={onClose} isOpen={isOpen} />}
      <ReactTable
        columns={columns}
        data={tableData}
        hasMore={pageInfo.hasNextPage}
        fetchMore={handleFetchMore}
      />
    </>
  );
}
