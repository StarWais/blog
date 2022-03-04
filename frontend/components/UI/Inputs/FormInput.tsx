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
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { useToggle } from '../../../hooks';

interface FormInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<InputProps, 'name' | 'defaultValue'> {
  label: string;
  type?: 'email' | 'password' | 'text';
}

const FormInput = <T extends FieldValues>({
  label,
  type,
  isRequired,
  name,
  isDisabled,
  control,
  ...rest
}: FormInputProps<T>) => {
  const {
    field,
    fieldState: { isTouched, error },
  } = useController<T>({
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
