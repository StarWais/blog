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
import { Fragment } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { useToggle } from '../../../hooks';

interface FormInputProps extends InputProps {
  label: string;
  name: string;
  type?: 'email' | 'password' | 'text';
}

const FormInput = ({
  label,
  type,
  isRequired,
  name,
  isDisabled,
  control,
  ...rest
}: UseControllerProps<FormInputProps>) => {
  const {
    field,
    fieldState: { isTouched, error },
  } = useController({
    name,
    control,
  });
  const { value: show, toggle } = useToggle(type === 'password');
  const Wrapper = type === 'password' ? InputGroup : Fragment;
  const isInvalid = Boolean(error && isTouched);
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
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
