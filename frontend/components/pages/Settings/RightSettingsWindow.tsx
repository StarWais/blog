import {
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { User } from '../../../types/User';
import EditProfileForm from './EditProfileForm';

interface RightSettingsWindowProps {
  user: User;
}

const RightSettingsWindow = ({ user }: RightSettingsWindowProps) => {
  return (
    <Box w="60%" shadow="sm">
      <Box>
        <Tabs size="lg">
          <Box bg="gray.50">
            <Heading as="h1" p={10}>
              Edit profile
            </Heading>
            <TabList>
              <Tab>Edit information</Tab>
              <Tab>Change password</Tab>
            </TabList>
          </Box>
          <TabPanels p={6}>
            <TabPanel>
              <EditProfileForm user={user} />
            </TabPanel>
            <TabPanel>Edit password</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default RightSettingsWindow;
