'use client';

import { useEffect } from "react";

import { usePropertyGlobalState } from "@/zustand-store/store";
import BookingContainer from "./BookingContainer";
import BookingCalendar from "./BookingCalendar";


const BookingWrapper = ({ propertyId, price, bookings }) => {

  useEffect(() => {

    usePropertyGlobalState.setState({
      propertyId: propertyId,
      price: price,
      bookings: bookings
    });

  }, []);

  return (
    <>

      <BookingCalendar />

      <BookingContainer />
      
    </>
  )
}


export default BookingWrapper;
