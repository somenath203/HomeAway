import Link from 'next/link';

import EmptyList from '../_components/home/EmptyList';
import CountryNameComponent from '../_components/card/CountryNameComponent';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FormContainer from '../_components/form/FormContainer';
import { fetchAllBookingsOfTheUser, deleteParticularBooking } from '@/server-actions/booking-actions';
import { formatDate } from '@/utils/formatedate';
import { formatCurrency } from '@/utils/formatcurrency';
import DeleteBookingButton from '../_components/booking/DeleteBookingButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const DeleteBookingComponent = ({ bookingId }) => {

  const deleteBookingAction = deleteParticularBooking.bind(null, {
    bookingId: bookingId
  });


  return <FormContainer action={deleteBookingAction}>

    <DeleteBookingButton />

  </FormContainer>

}


const Page = async () => {

  const allBookings = await fetchAllBookingsOfTheUser();

  if(allBookings.length === 0) {

    return <EmptyList />

  }
  
  return <div className='mt-16'>

    <h4 className="mb-4 capitalize">total bookings: {allBookings.length}</h4>

    <Table>

      <TableCaption>A list of your recent bookings</TableCaption>

      <TableHeader>

        <TableRow>

          <TableHead>Property Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Total Days</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Actions</TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>
        {allBookings.map((booking) => {

          const { id: bookingId, totalNights, orderTotal, checkIn, checkOut } = booking;

          const { id: propertyId, name, country } = booking.property;


          const fromDate = formatDate(checkIn);

          const toDate = formatDate(checkOut);


          return <TableRow key={bookingId}>

            <TableCell>
              <Link href={`/properties/${propertyId}`} className='underline text-muted-foreground tracking-wide'>{name}</Link>
            </TableCell>

            <TableCell>
              <CountryNameComponent countryCode={country} />
            </TableCell>

            <TableCell>
              {totalNights}
            </TableCell>

            <TableCell>
              {formatCurrency(orderTotal)}
            </TableCell>

            <TableCell>
              {fromDate}
            </TableCell>

            <TableCell>
              {toDate}
            </TableCell>

            <TableCell>

              <TooltipProvider>

                <Tooltip>

                  <TooltipTrigger><DeleteBookingComponent bookingId={bookingId} /></TooltipTrigger>

                  <TooltipContent>
                    <p>Cancel Booking</p>
                  </TooltipContent>

                </Tooltip>

              </TooltipProvider>
              
            </TableCell>

          </TableRow>
        
        })}
      </TableBody>

    </Table>

  </div>
};


export default Page;
