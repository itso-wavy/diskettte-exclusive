import { PageWrapper, WidthWrapper } from '@/components/layout';
import { SearchInput } from './components';

const Search: React.FC = () => {
  return (
    <PageWrapper>
      <WidthWrapper>
        <div className='pb-4 text-center font-semibold'>검색</div>
        <SearchInput />
      </WidthWrapper>
    </PageWrapper>
  );
};

export default Search;
