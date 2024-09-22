import Link from 'next/link';

import { fetchAllReservationsOfTheCurrentlyLoggedInUser } from '@/server-actions/reservation-action';
import EmptyList from '../_components/home/EmptyList';
import CountryNameComponent from '../_components/card/CountryNameComponent';
import { formatCurrency } from '@/utils/formatcurrency';
import { formatDate } from '@/utils/formatedate';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Page = async () => {
  const allReservationsOfTheCurrentlyLoggedInUser =
    await fetchAllReservationsOfTheCurrentlyLoggedInUser();

  if (allReservationsOfTheCurrentlyLoggedInUser.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">
        Total Reservations: {allReservationsOfTheCurrentlyLoggedInUser.length}
      </h4>

      <Table>
        <TableCaption>A list of all your recent reservations</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Number of Days</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allReservationsOfTheCurrentlyLoggedInUser.map((reservation) => {
            const {
              id: reservationId,
              orderTotal,
              totalNights,
              checkIn,
              checkOut,
            } = reservation;

            const { id: propertyId, name, country } = reservation.property;

            const checkInDateFormat = formatDate(checkIn);

            const checkOutDateFormat = formatDate(checkOut);

            return (
              <TableRow key={reservationId}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
                    className="underline text-muted-foreground tracking-wide"
                  >
                    {name}
                  </Link>
                </TableCell>

                <TableCell>
                  <CountryNameComponent countryCode={country} />
                </TableCell>

                <TableCell>{totalNights}</TableCell>

                <TableCell>{formatCurrency(orderTotal)}</TableCell>

                <TableCell>{checkInDateFormat}</TableCell>

                <TableCell>{checkOutDateFormat}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
