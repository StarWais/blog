import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { Fragment } from 'react';
import { useToggle } from '../../../hooks';

interface AuthInputProps extends InputProps {
  label: string;
  name: string;
  type?: 'email' | 'password' | 'text';
}

const AuthInput = ({
  label,
  type,
  isRequired,
  name,
  isDisabled,
  ...rest
}: AuthInputProps) => {
  const [field, { error, touched }] = useField(name);
  const { value: show, toggle } = useToggle(type === 'password');
  const Wrapper = type === 'password' ? InputGroup : Fragment;
  const isInvalid = Boolean(error && touched);
  return (
    <FormControl
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Wrapper>
        <Input
          {...field}
          {...rest}
          pr={type === 'password' ? '4.5rem' : undefined}
          type={type === 'password' ? (show ? 'password' : 'text') : type}
          variant="outline"
        />
        {type === 'password' && (
          <InputRightElement w="4.5rem">
            <Button
              isDisabled={isDisabled}
              h="1.75rem"
              size="sm"
              onClick={toggle}
            >
              {show ? 'Show' : 'Hide'}
            </Button>
          </InputRightElement>
        )}
      </Wrapper>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default AuthInput;
