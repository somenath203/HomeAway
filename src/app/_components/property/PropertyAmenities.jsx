import { LuFolderCheck } from 'react-icons/lu';

import PropertyTitle from './PropertyTitle';


const PropertyAmenities = ({ propertyAmenities }) => {
    
  const propertyAmenitiesListParsed = JSON.parse(propertyAmenities);

  const noAmenities = propertyAmenitiesListParsed.every((amenity) => !amenity.selected);

  if(noAmenities) {
    return null
  }

  return <div className='mt-4'>

    <PropertyTitle title='What this place offers' />

    <div className="grid md:grid-cols-2 gap-x-4">

        {propertyAmenitiesListParsed.map((amenity) => {

            if (!amenity.selected) {
                return null
            }

            return <div key={amenity.name} className='flex items-center gap-x-4 mb-2'>

                <LuFolderCheck className='h-6 w-6 text-primary' />

                <span className='font-light text-sm capitalize'>{amenity.name}</span>

            </div>

        })}

    </div> 

  </div>

};

export default PropertyAmenities;
