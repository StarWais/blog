import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import PostsTable from '../components/pages/AdminPanel/PostsTable';

import { PageProps } from './_app';

const AdminPanel: NextPage<PageProps> = () => {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <Container maxW="8xl" mx="auto" mt={10} px={10}>
        <Tabs size="lg">
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Users</Tab>
          </TabList>
          <TabPanels mt={8}>
            <TabPanel>
              <PostsTable />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

AdminPanel.defaultProps = {
  requiresAuth: true,
  admin: true,
};

export default AdminPanel;
