import { Box, Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { PageProps } from '../../pages/_app';
import {
  getCurrentUser,
  isFetchingUser,
} from '../../redux/auth/auth.selectors';
import { Role } from '../../types/User.d';

const AuthGuard: FC<PageProps> = ({ children, admin }) => {
  const user = useAppSelector(getCurrentUser);
  const router = useRouter();
  const condition = useMemo(
    () => !!user && (admin ? user.role === Role.ADMIN : true),
    [user, admin]
  );
  const isFetching = useAppSelector(isFetchingUser);
  useEffect(() => {
    if (!isFetching) {
      if (!condition) {
        router.push('/');
      }
    }
  }, [user, isFetching, router, condition]);

  if (isFetching) {
    return (
      <Stack
        h="100vh"
        w="100vw"
        bg="white"
        justify="center"
        align="center"
        position="fixed"
        inset={0}
        zIndex={2}
      >
        <Spinner color="purple" size="xl" />
      </Stack>
    );
  }
  if (!isFetching && condition) {
    return <>{children}</>;
  }
  return null;
};

export default AuthGuard;
