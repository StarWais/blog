import { GetServerSideProps, NextPage } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { getProfile } from '../../api/users.api';
import { User } from '../../types/User';

interface ProfileProps {
  profile: User;
}

const ProfilePage: NextPage<ProfileProps> = ({ profile }) => {
  console.log(profile);
  return <div>test</div>;
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
