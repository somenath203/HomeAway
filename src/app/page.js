import { Suspense } from 'react';

import CategoryList from './_components/home/CategoryList';
import PropertiesContainer from './_components/home/PropertiesContainer';
import LoadingCards from './_components/card/LoadingCards';


const Page = ({ searchParams }) => {

  
  return (
    <section>

      <CategoryList
        categorySearchParams={searchParams.category}
        searchBarSearchParams={searchParams.search}
      />

      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          categorySearchParams={searchParams.category}
          searchBarSearchParams={searchParams.search}
        />
      </Suspense>
      
    </section>
  );
};

export default Page;
