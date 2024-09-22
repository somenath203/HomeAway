'use client';

import { usePropertyGlobalState } from "@/zustand-store/store";
import ConfirmBooking from "./ConfirmBooking";
import BookingForm from "./BookingForm";


const BookingContainer = () => {

  const { range } = usePropertyGlobalState((state) => state);

  if(!range || !range.from || !range.to) {

    return null;

  }

  if (range.to.getTime() === range.from.getTime()) {

    return null;
    
  }


  return (
    <div className="w-full">

      <BookingForm />

      <ConfirmBooking />

    </div>
  )
}

export default BookingContainer;