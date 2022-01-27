import { Button, useDisclosure } from '@chakra-ui/react';
import LoginModal from '../../Modals/LoginModal';

interface LogInProps {
  text: string;
}

const LogIn = ({ text }: LogInProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{text}</Button>
      <LoginModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};
export default LogIn;
