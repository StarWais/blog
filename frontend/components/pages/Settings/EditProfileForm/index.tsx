import { VStack, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useForm, useWatch } from 'react-hook-form';
import { UpdateMeDetails } from '../../../../api/auth.api';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import useCheckEmailExists from '../../../../hooks/useCheckEmailExists';
import { updateMe } from '../../../../redux/auth/auth.thunks';
import { User } from '../../../../types/User';
import FormInput from '../../../UI/Inputs/FormInput';
import validationSchema from './validation';

interface EditProfileFormProps {
  user: User;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    trigger,
    clearErrors,
    formState: { isValid },
  } = useForm<UpdateMeDetails>({
    defaultValues: {
      name: user.name,
      email: user.email,
      description: user.description || '',
    },
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useAppDispatch();

  const isUpdating = useAppSelector(
    (state) => state.auth.isUpdatingUser === 'pending'
  );

  const emailField = useWatch({
    control,
    name: 'email',
  });

  useCheckEmailExists(
    () => {
      setError('email', {
        message: 'Email already exists',
      });
    },
    async () => {
      clearErrors('email');
      await trigger('email');
    },
    emailField
  );

  const onSubmit = (values: UpdateMeDetails) => {
    dispatch(updateMe(values));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="start">
        <FormInput name="name" control={control} label="Name" />
        <FormInput name="description" control={control} label="Description" />
        <FormInput name="email" control={control} label="Email" />
        <Button
          colorScheme="blue"
          type="submit"
          isLoading={isUpdating}
          disabled={!isValid}
        >
          Update info
        </Button>
      </VStack>
    </form>
  );
};

export default EditProfileForm;
