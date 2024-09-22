import Image from 'next/image';
import Link from 'next/link';

import CountryNameComponent from './CountryNameComponent';
import PropertyRatings from '../property/PropertyRatings';
import FavouriteToggleButton from './FavouriteToggleButton';
import { formatCurrency } from '@/utils/formatcurrency';

const PropertyCard = ({ property }) => {
  const { id: propertyId, name, image, tagline, country, price } = property;

  return (
    <article className="group relative">
      <Link href={`/properties/${propertyId}`}>
        <div className="relative h-[300px] mb-2 overflow-hidden rounded-md">
          <Image
            src={image}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            alt={name}
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold mt-1">
            {name?.substring(0, 30)}
          </h3>

          <PropertyRatings inPage={false} propertyId={propertyId} />
        </div>

        <p className="text-sm mt-1 text-muted-foreground">
          {tagline?.substring(0, 40)}...
        </p>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm mt-1">
            <span className="font-semibold">{formatCurrency(price)}</span> night
          </p>

          <CountryNameComponent countryCode={country} />
        </div>
      </Link>

      <div className="absolute top-5 right-5 z-5">
        <FavouriteToggleButton propertyId={propertyId} />
      </div>
    </article>
  );
};

export default PropertyCard;
