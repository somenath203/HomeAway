import EmptyList from "../_components/home/EmptyList";
import { deleteReview, fetchAllReviewsByCurrentlyLoggedInUser } from "@/server-actions/reviews-actions";
import ReviewCard from "../_components/review/ReviewCard";
import ReviewTitle from "../_components/review/ReviewTitle";
import FormContainer from "../_components/form/FormContainer";
import DeleteReviewButton from "../_components/review/DeleteReviewButton";


const Page = async () => {

  const allReviewsByUser = await fetchAllReviewsByCurrentlyLoggedInUser();

  if(allReviewsByUser.length === 0) {
    return <EmptyList />
  }


  return (
    <>

      <ReviewTitle title='Your Reviews' />

      <section className="grid md:grid-cols-2 gap-8 mt-4">

        {allReviewsByUser.map((review) => {

          const { comment, rating, id } = review;

          const { name, image } = review.property; 

          const deleteReviewAction = deleteReview.bind(null, { reviewId: id });

          return <ReviewCard 
                    key={id}
                    comment={comment} 
                    rating={rating} 
                    firstName={name} 
                    lastName={undefined} 
                    profileImage={image} 
                  >
                    
                    <FormContainer action={deleteReviewAction}>

                      <DeleteReviewButton />

                    </FormContainer>
                    
                  </ReviewCard>

        })}

      </section>

    </>
  )
}

export default Page;