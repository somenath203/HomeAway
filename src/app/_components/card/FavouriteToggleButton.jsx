import { auth } from '@clerk/nextjs/server';

import FavouritesSignInButton from './FavouritesSignInButton';
import { fetchFavouriteProperty } from '@/server-actions/property-actions';
import FavouriteToggleForm from './FavouriteToggleForm';


const FavouriteToggleButton = async ({ propertyId }) => {

  const { userId } = auth();

  if (!userId) {
    return <FavouritesSignInButton />;
  }

  const favouritePropertyId = await fetchFavouriteProperty({
    propertyId: propertyId,
  });

  return (
    <FavouriteToggleForm
      fechedFavouritePropertyIdFromServerAction={favouritePropertyId}
      idOfPropertyOnWhichUserClicked={propertyId}
    />
  );
};

export default FavouriteToggleButton;
