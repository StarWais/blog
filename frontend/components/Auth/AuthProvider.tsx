import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { getMe } from '../../redux/auth/auth.thunks';

const AuthProvider: FC<any> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    ) {
      dispatch(getMe());
    }
  }, []);
  return children;
};

export default AuthProvider;
