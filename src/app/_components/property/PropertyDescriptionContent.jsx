'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import PropertyTitle from './PropertyTitle';


const PropertyDescriptionContent = ({ propertyDescriptionContent }) => {
  
  const [showFullDescription, setShowFullDescription] = useState(false);

  const wordsInDescription = propertyDescriptionContent.split(' ');

  const isDescriptionLong = wordsInDescription.length > 100;

  const toggleLongDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const displayDescriptionCondition =
    isDescriptionLong && !showFullDescription
      ? wordsInDescription.splice(0, 100).join(' ') + '...'
      : propertyDescriptionContent;

  return (
    <article className="mt-4">
      <PropertyTitle title="Description" />

      <p className="text-muted-foreground font-light leading-loose">
        {displayDescriptionCondition}
      </p>

      {isDescriptionLong && (
        <Button variant="link" className="pl-0" onClick={toggleLongDescription}>
          {showFullDescription ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </article>
  );
};

export default PropertyDescriptionContent;
