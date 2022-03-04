import { VStack, Button, Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ChangePasswordDetails } from '../../../../api/auth.api';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { logOut } from '../../../../redux/auth/auth.slice';

import { changePassword } from '../../../../redux/auth/auth.thunks';

import FormInput from '../../../UI/Inputs/FormInput';
import validationSchema from './validation';

const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordDetails>({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useAppDispatch();

  const changingPasswordState = useAppSelector(
    (state) => state.auth.isChangingPassword
  );

  useEffect(() => {
    if (changingPasswordState === 'succeeded') {
      dispatch(logOut());
    }
  }, [changingPasswordState]);

  const serverError = useAppSelector(
    (state) => state.auth.changingPasswordError
  );

  const onSubmit = (values: ChangePasswordDetails) => {
    dispatch(changePassword(values));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="start">
        <FormInput name="oldPassword" control={control} label="Old password" />
        <FormInput name="newPassword" control={control} label="New Password" />
        <Button
          colorScheme="blue"
          type="submit"
          isLoading={changingPasswordState === 'pending'}
        >
          Change password
        </Button>
        {changingPasswordState === 'failed' && (
          <Box color="red">{serverError}</Box>
        )}
      </VStack>
    </form>
  );
};

export default ChangePasswordForm;
