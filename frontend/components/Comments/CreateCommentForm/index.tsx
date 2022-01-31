import {
  Avatar,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppSelector } from '../../../hooks';
import { getCurrentUser } from '../../../redux/auth/auth.selectors';
import { getUploadUrl } from '../../../utils/helpers';
import validationSchema from './validation';

export interface CommentFormInputs {
  content: string;
}

export interface CreateCommentFormProps {
  onSubmit: (data: CommentFormInputs) => void;
  isLoading: boolean;
}

const CreateCommentForm = ({ onSubmit, isLoading }: CreateCommentFormProps) => {
  const user = useAppSelector(getCurrentUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormInputs>({
    resolver: yupResolver(validationSchema),
  });
  if (!user) return null;

  const handleFormSubmit = (data: CommentFormInputs) => {
    onSubmit(data);
    reset();
  };
  return (
    <HStack mt={4} mb={8} w="full">
      <Avatar size="md" src={getUploadUrl(user.picture)} name={user.name} />
      <form
        onSubmit={handleSubmit<CommentFormInputs>(handleFormSubmit)}
        style={{
          width: '100%',
        }}
      >
        <FormControl isInvalid={Boolean(errors.content)} isDisabled={isLoading}>
          <Input
            {...register('content', {
              required: true,
              minLength: 2,
              maxLength: 255,
            })}
            placeholder="Add a comment..."
            size="lg"
            fontSize="md"
          />
          <FormErrorMessage position="absolute">
            {errors.content?.message}
          </FormErrorMessage>
        </FormControl>
      </form>
    </HStack>
  );
};

export default CreateCommentForm;
