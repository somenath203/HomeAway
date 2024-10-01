import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs/server';

import { fetchParticularPropertyDetailById } from '@/server-actions/property-actions';
import BreadCumbs from '@/app/_components/property/BreadCumbs';
import FavouriteToggleButton from '@/app/_components/card/FavouriteToggleButton';
import ShareButton from '@/app/_components/property/ShareButton';
import PropertyImageContainer from '@/app/_components/property/PropertyImageContainer';
import PropertyRatings from '@/app/_components/property/PropertyRatings';
import PropertyDetails from '@/app/_components/property/PropertyDetails';
import PropertyUserInfo from '@/app/_components/property/PropertyUserInfo';
import { Separator } from '@/components/ui/separator';
import PropertyDescriptionContent from '@/app/_components/property/PropertyDescriptionContent';
import PropertyAmenities from '@/app/_components/property/PropertyAmenities';
import { Skeleton } from '@/components/ui/skeleton';
import SubmitReview from '@/app/_components/review/SubmitReview';
import PropertyReviews from '@/app/_components/review/PropertyReviews';
import { findExistingReviewOnParticularPropertyByCurrentlyLoggedInUser } from '@/server-actions/reviews-actions';


const Page = async ({ params }) => {


  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasProfile) {

    redirect('/profile/create');
    
  }


  const DynamicMap = dynamic(() => import('@/app/_components/property/PropertyMap'), {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />
  });

  const DynamicBookingWrapper = dynamic(() => import('@/app/_components/booking/BookingWrapper'), {
    ssr: false,
    loading: () => <Skeleton className='h-[200px] w-full' />
  });


  const property = await fetchParticularPropertyDetailById(params.id);

  if (!property) {
    redirect('/');
  }

  const { noOfBathrooms, noOfBeds, noOfBedrooms, noOfGuests } = property;

  const particularPropertyDetailObj = {
    noOfBathrooms,
    noOfBedrooms,
    noOfBeds,
    noOfGuests,
  };

  const userFullNameWhoCreatedTheProperty = `${property?.profile?.firstName} ${property?.profile?.lastName}`;

  const userProfileImageWhoCreatedTheProperty = property?.profile?.profileImage;


  const { userId } = auth();

  const isCurrentLoggedInUserNotOwner = property.profile.clerkId !== userId;

  const isCurrentLoggedInUserAllowedToGiveReview = userId && isCurrentLoggedInUserNotOwner && !(await findExistingReviewOnParticularPropertyByCurrentlyLoggedInUser(userId, property.id));
  
  
  return (
    <section>
      <BreadCumbs propertyName={property?.name} />

      <header className="flex items-center justify-between mt-4">
        <h1 className="text-4xl font-bold capitalize">{property?.tagline}</h1>

        <div className="flex items-center gap-4">
          <ShareButton propertyId={property?.id} name={property?.name} />

          <FavouriteToggleButton propertyId={property?.id} />
        </div>
      </header>

      <PropertyImageContainer
        propertyImage={property?.image}
        propertyName={property?.name}
      />

      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property?.name}</h1>

            <PropertyRatings inPage={true} propertyId={property?.id} />
          </div>

          <PropertyDetails propertyDetails={particularPropertyDetailObj} />

          <PropertyUserInfo
            userFullName={userFullNameWhoCreatedTheProperty}
            userProfileImage={userProfileImageWhoCreatedTheProperty}
          />

          <Separator className='mt-4' />

          <PropertyDescriptionContent propertyDescriptionContent={property?.description} />

          <PropertyAmenities propertyAmenities={property?.amenities} />

          <DynamicMap countryCode={property?.country} />
          
        </div>

        <div className="lg:col-span-4 flex flex-col items-center">
          
          <DynamicBookingWrapper propertyId={property.id} price={property.price} bookings={property.propertyBooking} />

        </div>

      </section>

      {isCurrentLoggedInUserAllowedToGiveReview && <SubmitReview propertyId={property.id} /> }

      <PropertyReviews propertyId={property.id} />

    </section>
  );
};

export default Page;
