import { fetchAllAvailableProperties } from '@/server-actions/property-actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';

const PropertiesContainer = async ({ categorySearchParams, searchBarSearchParams }) => {

  
  const allProperties = await fetchAllAvailableProperties({
    search: searchBarSearchParams,
    category: categorySearchParams,
  });


  if(allProperties?.length === 0) {

    return (
      <EmptyList
        heading="No results found 🚫"
        message="Try changing or removing some of your filters"
        btnText='Clear all Filters'
      />
    );

  }

  return <PropertiesList properties={allProperties} />

};

export default PropertiesContainer;
