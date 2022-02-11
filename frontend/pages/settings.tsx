import { Container, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import LeftSettingsWindow from '../components/pages/Settings/LeftSettingsWindow';
import RightSettingsWindow from '../components/pages/Settings/RightSettingsWindow';
import { useAppSelector } from '../hooks';
import { getCurrentUser } from '../redux/auth/auth.selectors';
import { User } from '../types/User';
import { PageProps } from './_app';

const Settings: NextPage<PageProps> = () => {
  const user = useAppSelector(getCurrentUser) as User;
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Container maxW="8xl" mx="auto" mt={12}>
        <Flex justifyContent="space-between" align="start">
          <LeftSettingsWindow user={user} />
          <RightSettingsWindow user={user} />
        </Flex>
      </Container>
    </>
  );
};

Settings.defaultProps = {
  requiresAuth: true,
};

export default Settings;
