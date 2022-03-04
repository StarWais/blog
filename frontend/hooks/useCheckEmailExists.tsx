import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { checkEmailExists } from '../redux/auth/auth.thunks';
import useDebounce from './useDebounce';

const useCheckEmailExists = (
  onExists: () => void,
  onNotExists: () => void,
  email?: string,
  delay = 600
) => {
  const user = useAppSelector((state) => state.auth.currentUser);
  const serverEmailExists = useAppSelector((state) => state.auth.emailExists);
  const emailExists = user
    ? user.email === email
      ? false
      : serverEmailExists
    : serverEmailExists;
  const emailDebounced = useDebounce(email, delay);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (emailDebounced) {
      dispatch(checkEmailExists(emailDebounced));
    }
  }, [emailDebounced, dispatch]);

  useEffect(() => {
    if (emailExists) {
      onExists();
    } else {
      onNotExists();
    }
  }, [emailExists]);
};

export default useCheckEmailExists;
