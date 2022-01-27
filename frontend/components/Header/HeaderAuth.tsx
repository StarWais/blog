import { Button, ButtonGroup, Spinner } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks';
import {
  getCurrentUser,
  isFetchingUser,
} from '../../redux/auth/auth.selectors';
import LogIn from '../Auth/Buttons/LogIn';
import SignUp from '../Auth/Buttons/SignUp';
import UserProfile from './UserProfile';

const HeaderAuth = () => {
  const user = useAppSelector(getCurrentUser);
  const isFetching = useAppSelector(isFetchingUser);
  if (isFetching) return <Spinner color="blue.500" size="sm" />;
  if (!user) {
    return (
      <ButtonGroup variant="outline" colorScheme="blue" size="sm">
        <LogIn text="Log in" />
        <SignUp text="Sign Up" />
      </ButtonGroup>
    );
  }
  if (user) return <UserProfile {...user} />;
  return null;
};

export default HeaderAuth;
