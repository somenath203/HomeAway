import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "./Rating";
import Comment from "./Comment";


const ReviewCard = ({ comment, rating, firstName, lastName, profileImage, children }) => {
  
  return <Card className='relative'>

    <CardHeader>

      <div className="flex items-center">

        <img src={profileImage} alt='profile' className='w-12 h-12 rounded-full object-cover' />

        <div className="ml-4">

          <h3 className='text-sm font-bold capitalize mb-1'>{firstName} {lastName}</h3>

          <Rating rating={rating} />

        </div>

      </div>

    </CardHeader>


    <CardContent>

      <Comment comment={comment} />

    </CardContent>


    <div className="absolute top-3 right-3">
      { children }
    </div>


  </Card>
};

export default ReviewCard;
