import Link from "next/link";

import EmptyList from "../_components/home/EmptyList";
import { fetchAllPropertiesOfTheCurrentLoggedInUser, deleteProperty } from "@/server-actions/property-actions";
import { formatCurrency } from "@/utils/formatcurrency";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import FormContainer from "../_components/form/FormContainer";
import PropertyDeleteButton from "../_components/property/PropertyDeleteButton";
import PropertyEditButton from "../_components/property/PropertyEditButton";


const DeleteRentalComponent = ({ propertyId }) => {

  const deleteRental = deleteProperty.bind(null, {
    propertyId: propertyId
  });

  return <FormContainer action={deleteRental}>

    <PropertyDeleteButton />

  </FormContainer>

}

const Page = async () => {

  const allRentalsOfTheAuthenticatedUser = await fetchAllPropertiesOfTheCurrentLoggedInUser();
  

  if (allRentalsOfTheAuthenticatedUser.bookingInfoOfEachRentalsOfTheCurrentLoggedInUser.length === 0) {

    return <EmptyList heading="No Rental to Display" message="Don't hesitate to create a rental." />

  }

  return (
    <div className="mt-16">

      <h4 className="mb-4 capitalize">Active Properties: {allRentalsOfTheAuthenticatedUser.bookingInfoOfEachRentalsOfTheCurrentLoggedInUser.length}</h4>

      <Table>

        <TableCaption>A list of all your Properties</TableCaption>

        <TableHeader>

          <TableRow>

            <TableHead>Rental Name</TableHead>
            <TableHead>Rental Price</TableHead>
            <TableHead>Total Number of Days Booked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Action</TableHead>

          </TableRow>

        </TableHeader>


        <TableBody>
          {allRentalsOfTheAuthenticatedUser.bookingInfoOfEachRentalsOfTheCurrentLoggedInUser.map((rental) => {

            const { 
              id: propertyId, 
              name, 
              price, 
              totalNumberOfDaysOfEachProperty, 
              totalOrderAmountOfEachProperty 
            } = rental;

            return <TableRow key={propertyId}>

              <TableCell>
                <Link href={`/properties/${propertyId}`} className="underline text-muted-foreground tracking-wide">{name}</Link>
              </TableCell>

              <TableCell>
                {formatCurrency(price)}
              </TableCell>

              <TableCell>
                {totalNumberOfDaysOfEachProperty ? totalNumberOfDaysOfEachProperty : 0}
              </TableCell>

              <TableCell>
                {totalOrderAmountOfEachProperty ? formatCurrency(totalOrderAmountOfEachProperty) : 0}
              </TableCell>

              <TableCell className='flex items-center gap-x-2'>
                
                <Link href={`/rentals/edit/${propertyId}`}>
                  <PropertyEditButton />
                </Link>

                <DeleteRentalComponent propertyId={propertyId} />

              </TableCell>

            </TableRow>

          })}
        </TableBody>

      </Table>
    
    </div>
  )
}

export default Page;