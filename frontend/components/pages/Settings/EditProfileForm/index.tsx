import { VStack, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { User } from '../../../../types/User';
import FormInput from '../../../UI/Inputs/FormInput';
import validationSchema from './validation';

interface EditProfileFormProps {
  user: User;
}
interface EditProfileFormValues {
  name: string;
  email: string;
  description: string;
  confirmEmail: string;
}

const onSubmit = (values: EditProfileFormValues) => {};

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const { control, handleSubmit } = useForm<EditProfileFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      description: user.description || '',
      confirmEmail: user.email,
    },
    resolver: yupResolver(validationSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="start">
        <FormInput name="name" control={control} label="Name" />
        <FormInput name="description" control={control} label="Description" />
        <FormInput name="email" control={control} label="Email" />
        <FormInput
          name="confirmEmail"
          control={control}
          label="Email confirmation"
        />
        <Button colorScheme="blue" type="submit">
          Update info
        </Button>
      </VStack>
    </form>
  );
};

export default EditProfileForm;
