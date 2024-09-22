import { FaStar } from 'react-icons/fa';

import { fetchAveragePropertyRatingAndTotalNumberOfRatings } from '@/server-actions/property-actions';


const PropertyRatings = async ({ propertyId, inPage }) => {


  const { averageRating, totalNumberOfRatings } = await fetchAveragePropertyRatingAndTotalNumberOfRatings(propertyId);


  if(totalNumberOfRatings === 0) {

    return null;

  }
  
  const countText = totalNumberOfRatings > 1 ? 'reviews' : 'review';

  const countValue = `(${totalNumberOfRatings}) ${inPage ? countText : ''}`;

  return (
    <span className={`flex gap-1 items-center ${inPage ? 'text-md' : 'text-sm'}`}>

      <FaStar className='w-3 h-3' />

      { averageRating } { countValue }
      
    </span>
  )
}

export default PropertyRatings;