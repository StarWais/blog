import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { signUp } from '../../../redux/auth/auth.thunks';
import { SignUpDetails } from '../../../api/auth.api';
import FormInput from '../../UI/Inputs/FormInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validation';

interface SignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}
interface SignupFormDetails extends SignUpDetails {
  passwordConfirm: string;
}

const SignupModal = ({ isOpen, onClose }: SignupFormProps) => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => state.auth.isAuthError);
  const error = useAppSelector((state) => state.auth.authError);
  const isLoggingIn = useAppSelector((state) => state.auth.isAuthorizing);

  const initialValues: SignupFormDetails = {
    email: '',
    password: '',
    name: '',
    passwordConfirm: '',
  };

  const onSubmit = (values: SignupFormDetails) => {
    dispatch(signUp({ ...values }));
  };
  const { control, handleSubmit } = useForm<SignupFormDetails>({
    resolver: yupResolver(validationSchema),
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create new account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              {isError && <Box color="red">{error}</Box>}
              <FormInput
                isDisabled={isLoggingIn}
                isRequired
                control={control}
                type="email"
                name="email"
                label="E-mail"
              />
              <FormInput
                isDisabled={isLoggingIn}
                isRequired
                name="name"
                control={control}
                label="Name"
              />
              <FormInput
                isRequired
                isDisabled={isLoggingIn}
                type="password"
                control={control}
                name="password"
                label="Password"
              />
              <FormInput
                isRequired
                isDisabled={isLoggingIn}
                type="password"
                control={control}
                name="passwordConfirm"
                label="Password confirmation"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="solid">
              <Button colorScheme="blue" type="submit" isLoading={isLoggingIn}>
                Sign up
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default SignupModal;
