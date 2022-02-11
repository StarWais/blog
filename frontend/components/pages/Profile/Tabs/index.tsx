import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ProfileProps } from '../ProfileTopContent';
import RecentCommentsTab from './RecentCommentsTab';
import RecentPostsTab from './RecentPostsTab';

const ProfileTabs = ({ profile }: ProfileProps) => {
  return (
    <Tabs size="lg">
      <TabList>
        <Tab>Recent posts</Tab>
        <Tab>Recent comments</Tab>
      </TabList>
      <TabPanels mt={8}>
        <TabPanel>
          <RecentPostsTab posts={profile.recentPosts} />
        </TabPanel>
        <TabPanel>
          <RecentCommentsTab comments={profile.recentComments} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
