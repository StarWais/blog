import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { getProfile } from '../../api/users.api';
import { Profile } from '../../types/User';
import ProfileTopContent from '../../components/pages/Profile/ProfileTopContent';
import ProfileStats from '../../components/pages/Profile/ProfileStats';
import ProfileTabs from '../../components/pages/Profile/Tabs';

interface ProfileProps {
  profile: Profile;
}

const ProfilePage: NextPage<ProfileProps> = ({ profile }) => {
  return (
    <>
      <Head>
        <title>{profile.name} profile</title>
      </Head>
      <Container maxW="8xl" mx="auto" mt={12}>
        <ProfileTopContent profile={profile} />
        <ProfileStats profile={profile} />
        <ProfileTabs profile={profile} />
      </Container>
    </>
  );
};

interface IParams extends NextParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as IParams;
  try {
    const profile = await getProfile({ id: Number(id) });
    if (!profile) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        profile,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ProfilePage;
