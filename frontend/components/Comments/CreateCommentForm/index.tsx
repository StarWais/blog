import {
  Avatar,
  Button,
  ButtonGroup,
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
  placeholder?: string;
  defaultText?: string;
  withButtons?: boolean;
  comfirmButtonText?: string;
  onCancel?: () => void;
}

const CreateCommentForm = ({
  onSubmit,
  isLoading,
  defaultText,
  onCancel,
  comfirmButtonText = 'Submit',
  withButtons = false,
  placeholder = 'Add a comment...',
}: CreateCommentFormProps) => {
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
    reset(
      {
        content: '',
      },
      {
        keepTouched: false,
      }
    );
  };
  return (
    <form
      onSubmit={handleSubmit<CommentFormInputs>(handleFormSubmit)}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HStack my={4} w="full">
        <Avatar size="md" src={getUploadUrl(user.picture)} name={user.name} />
        <FormControl isInvalid={Boolean(errors.content)} isDisabled={isLoading}>
          <Input
            {...register('content', {
              required: true,
              minLength: 2,
              maxLength: 255,
            })}
            defaultValue={defaultText}
            placeholder={placeholder}
            size="lg"
            fontSize="md"
          />
          <FormErrorMessage position="absolute">
            {errors.content?.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>
      {withButtons && (
        <ButtonGroup ml="auto" mt={3}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            {comfirmButtonText}
          </Button>
        </ButtonGroup>
      )}
    </form>
  );
};

export default CreateCommentForm;
