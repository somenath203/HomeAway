import PropertyTitle from "../property/PropertyTitle";
import ReviewCard from "./ReviewCard";
import { fetchAllReviewsOfAParticularProperty } from "@/server-actions/reviews-actions";


const PropertyReviews = async ({ propertyId }) => {

  const allReviewsOfTheParticularProperty = await fetchAllReviewsOfAParticularProperty(propertyId);

  if(allReviewsOfTheParticularProperty.length < 1) {

    return null;
  
  }

  return (
    <div className='mt-8'>

      <PropertyTitle title='Reviews' />

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        
        {allReviewsOfTheParticularProperty.map((review) => {

          const { id, comment, rating } = review;

          const { firstName, lastName, profileImage } = review.profile;

          return <ReviewCard 
                    key={id} 
                    comment={comment} 
                    rating={rating} 
                    firstName={firstName} 
                    lastName={lastName} 
                    profileImage={profileImage}
                  />

        })}

      </div>

    </div>
  )
}

export default PropertyReviews;