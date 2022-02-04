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
import { Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { signUp } from '../../../redux/auth/auth.thunks';
import { SignUpDetails } from '../../../api/auth.api';
import AuthInput from '../../UI/Inputs/AuthInput';
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
  const isError = useAppSelector((state) => state.auth.isError);
  const error = useAppSelector((state) => state.auth.error);
  const isLoggingIn = useAppSelector((state) => state.auth.isAuthorizing);

  const initialValues: SignupFormDetails = {
    email: '',
    password: '',
    name: '',
    passwordConfirm: '',
  };

  const handleSubmit = (values: SignupFormDetails) => {
    dispatch(signUp({ ...values }));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <ModalHeader>Create new account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={3}>
                {isError && <Box color="red">{error}</Box>}
                <AuthInput
                  isDisabled={isLoggingIn}
                  isRequired
                  type="email"
                  name="email"
                  label="E-mail"
                />
                <AuthInput
                  isDisabled={isLoggingIn}
                  isRequired
                  name="name"
                  label="Name"
                />
                <AuthInput
                  isRequired
                  isDisabled={isLoggingIn}
                  type="password"
                  name="password"
                  label="Password"
                />
                <AuthInput
                  isRequired
                  isDisabled={isLoggingIn}
                  type="password"
                  name="passwordConfirm"
                  label="Password confirmation"
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup variant="solid">
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={isLoggingIn}
                >
                  Sign up
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ButtonGroup>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};
export default SignupModal;
