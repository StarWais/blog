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
import { logIn } from '../../../redux/auth/auth.thunks';
import { LogInDetails } from '../../../services/auth.api';
import AuthInput from '../../UI/Inputs/AuthInput';
import validationSchema from './validation';

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => state.auth.isError);
  const error = useAppSelector((state) => state.auth.error);
  const isLoggingIn = useAppSelector((state) => state.auth.isAuthorizing);

  const initialValues: LogInDetails = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: LogInDetails) => {
    dispatch(logIn({ ...values }));
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
            <ModalHeader>Authorization</ModalHeader>
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
                  isRequired
                  isDisabled={isLoggingIn}
                  type="password"
                  name="password"
                  label="Password"
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
                  Log in
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
export default LoginModal;
