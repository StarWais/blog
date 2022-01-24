import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  interface SearchFormData {
    query: string;
  }
  const router = useRouter();
  const { handleSubmit, register } = useForm<SearchFormData>();

  const onSubmit = ({ query }: SearchFormData) => {
    const urlEncodedSearchText = encodeURIComponent(query);
    router.push(`/search?search=${urlEncodedSearchText}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="query" srOnly>
          Search query
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.500" />
          </InputLeftElement>
          <Input
            id="query"
            placeholder="Search..."
            variant="outline"
            {...register('query')}
          />
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default Search;
