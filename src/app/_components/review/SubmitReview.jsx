'use client';

import { useState } from "react";

import SubmitButton from "../form/SubmitButton";
import FormContainer from "../form/FormContainer";
import { Card } from "@/components/ui/card";
import RatingInput from "./RatingInput";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { createReview } from "@/server-actions/reviews-actions";


const SubmitReview = ({ propertyId }) => {

  const [ isReviewFormVisible, setIsReviewFormVisible ] = useState(false);

  return (
    <div className='mt-8'>

      <Button onClick={() => setIsReviewFormVisible((prevValue) => !prevValue)}>
        Leave a Review
      </Button>

      {isReviewFormVisible && <Card className='p-8 mt-8'>

        <FormContainer action={createReview}>

          <input type="hidden" name="idOfThePropertyWhoseReviewHasBeenGiven" value={propertyId} />

          <RatingInput name='rating'  />


          <Label htmlFor='comment' className="capitalize" rows={5} required>
            Write your thoughts on this property
          </Label>

          <Textarea
            id='comment'
            name='comment' 
            className="leading-loose !resize-none"
            defaultValue='amazing place'
            required
          />

          <SubmitButton buttontext='Submit Review' className='mt-4' />

        </FormContainer>
        
      </Card>}
      
    </div>
  )
}


export default SubmitReview;