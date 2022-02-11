import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  interface SearchFormData {
    query: string;
  }
  const router = useRouter();

  const onSubmit = ({ query }: SearchFormData) => {
    const urlEncodedSearchText = encodeURIComponent(query);
    router.push(`/search?search=${urlEncodedSearchText}`);
  };

  const { register, handleSubmit } = useForm<SearchFormData>();

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
            {...register('query')}
            placeholder="Search..."
            variant="outline"
          />
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default Search;
