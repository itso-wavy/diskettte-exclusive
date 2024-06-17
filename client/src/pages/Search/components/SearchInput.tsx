import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { SearchList } from '.';
import { Form } from '@/components/form';
import Loader from '@/components/Loader';
import ErrorText from '@/components/ErrorText';

import { RootState } from '@/lib/store';
import { debounce } from '@/lib/utils/debounce';
import { profileKeys, searchUsers } from '@/lib/queries/profile';

const SearchInput: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: profileKeys.searchUser({ isLoggedIn, searchQuery }),
    queryFn: searchUsers,
  });
  const { result } = response?.data || {};

  const handleSearch = debounce(async (query: string) => {
    setSearchQuery(query);
  }, 300);

  if (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    return (
      <ErrorText handleRetry={refetch} className='h-[calc(100vh-191px)]' />
    );
  } else {
    return (
      <>
        <Form.Input
          labelHidden
          autoFocus
          placeholder='Search'
          className='z-10 caret-gamma placeholder:font-medium focus:border-alpha '
          onChange={e => handleSearch(e.target.value.trim())}
        />
        {isLoading ? (
          <Loader className='h-[calc(100vh-326px)]' />
        ) : (
          <SearchList isLoggedIn={isLoggedIn} result={result} />
        )}
      </>
    );
  }
};

export default SearchInput;
