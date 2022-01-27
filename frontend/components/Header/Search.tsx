import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  interface SearchFormData {
    query: string;
  }
  const initialValues: SearchFormData = {
    query: '',
  };
  const router = useRouter();

  const handleSubmit = ({ query }: SearchFormData) => {
    const urlEncodedSearchText = encodeURIComponent(query);
    router.push(`/search?search=${urlEncodedSearchText}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Field name="query">
          {/* @ts-ignore */}
          {({ field }) => (
            <FormControl>
              <FormLabel htmlFor="query" srOnly>
                Search query
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSearch color="gray.500" />
                </InputLeftElement>
                <Input {...field} placeholder="Search..." variant="outline" />
              </InputGroup>
            </FormControl>
          )}
        </Field>
      </Form>
    </Formik>
  );
};

export default Search;
