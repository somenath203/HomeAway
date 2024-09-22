'use client';

import Image from 'next/image';

const PropertyImageContainer = ({ propertyImage }) => {
  return (
    <div className="h-[300px] md:h-[500px] relative mt-8">

      <Image
        src={propertyImage}
        fill
        sizes="100vw"
        className="object rounded"
        priority
      />

      
    </div>
  );
};

export default PropertyImageContainer;
