'use client';

import { useAuth, SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { usePropertyGlobalState } from "@/zustand-store/store";
import FormContainer from "../form/FormContainer";
import SubmitButton from "../form/SubmitButton";
import { createNewBookingOfProperty } from "@/server-actions/booking-actions";


const ConfirmBooking = () => {

  const { userId } = useAuth();

  const { propertyId, range } = usePropertyGlobalState((state) => state);


  if(!userId) {
    return <SignInButton mode="modal">

      <Button type='button' className='w-full'>
        Sign In to Continue
      </Button>

    </SignInButton>
  }


  const createBookingBind = createNewBookingOfProperty.bind(null, {
    propertyId: propertyId,
    range: range
  });

  return (
    <section>

      <FormContainer action={createBookingBind}>

        <SubmitButton buttontext='Confirm Booking' className='w-full' />

      </FormContainer>

    </section>
  )
}

export default ConfirmBooking;