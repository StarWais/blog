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
import { logIn } from '../../../redux/auth/auth.thunks';
import { LogInDetails } from '../../../api/auth.api';
import validationSchema from './validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../UI/Inputs/FormInput';

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => state.auth.isError);
  const error = useAppSelector((state) => state.auth.error);
  const isLoggingIn = useAppSelector((state) => state.auth.isAuthorizing);

  const onSubmit = (values: LogInDetails) => {
    dispatch(logIn({ ...values }));
  };
  const { control, handleSubmit } = useForm<LogInDetails>({
    resolver: yupResolver(validationSchema),
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Authorization</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              {isError && <Box color="red">{error}</Box>}
              <FormInput
                isDisabled={isLoggingIn}
                control={control}
                isRequired
                type="email"
                name="email"
                label="E-mail"
              />
              <FormInput
                isRequired
                control={control}
                isDisabled={isLoggingIn}
                type="password"
                name="password"
                label="Password"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="solid">
              <Button colorScheme="blue" type="submit" isLoading={isLoggingIn}>
                Log in
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default LoginModal;
