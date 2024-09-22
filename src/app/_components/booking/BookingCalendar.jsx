'use client';

import { useState, useEffect } from "react";

import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { usePropertyGlobalState } from "@/zustand-store/store";
import {
  defaultSelected,
  generateDisabledDates,
  generateDateRange,
  generateBlockedPeriods
} from "@/utils/calendarutilsfunctions";


const BookingCalendar = () => {

  const { toast } = useToast();

  const currentDate = new Date();

  const [ dateFromToDateRange, setFromToDateDateRange ] = useState(defaultSelected);

  const allBookingsOfTheParticularProperty = usePropertyGlobalState((state) => state.bookings);

  const blockedPeriods = generateBlockedPeriods({
    bookings: allBookingsOfTheParticularProperty,
    today: currentDate
  });
  

  const objectOfDatesThatAreUnavailableWithinTheGivenRangeForBooking = generateDisabledDates(blockedPeriods);


  useEffect(() => {


    const selectedRangeInArrayForm = generateDateRange(dateFromToDateRange);

    selectedRangeInArrayForm.some((date) => {


      if(objectOfDatesThatAreUnavailableWithinTheGivenRangeForBooking[date]) {
        
        setFromToDateDateRange(defaultSelected);

        toast({
          description: 'Some of the dates within the selected range are already booked by another user. Please select the dates again.'
        });

        return true;

      }

      return false;

    });


    usePropertyGlobalState.setState({
      range: dateFromToDateRange
    });

  }, [dateFromToDateRange]);

  
  return (
    <Calendar 
      mode='range' 
      defaultMonth={currentDate}
      selected={dateFromToDateRange}
      onSelect={setFromToDateDateRange}
      className='mb-4'
      disabled={blockedPeriods}
    />
  )

}


export default BookingCalendar;