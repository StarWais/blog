import { Button, useDisclosure } from '@chakra-ui/react';
import SignupModal from '../../Modals/SignupModal';

interface LogInProps {
  text: string;
}

const LogIn = ({ text }: LogInProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{text}</Button>
      <SignupModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};
export default LogIn;
