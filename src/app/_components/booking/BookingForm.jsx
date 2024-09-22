import { usePropertyGlobalState } from "@/zustand-store/store";
import { calculateTotalBillOfTheBooking } from "@/utils/calculatebookingtotal";
import { formatCurrency } from "@/utils/formatcurrency";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


const FormRow = ({ label, amount }) => {
  return (
    <p className="flex justify-between text-sm mb-2">

      <span>{label}</span>

      <span>{formatCurrency(amount)}</span>

    </p>
  )
}


const BookingForm = () => {

  const { range, price } = usePropertyGlobalState((state) => state);


  const { 
    totalNoOfDaysUserHasBookedTheRental, 
    subTotal, 
    cleaningChargeInRental, 
    serviceChargeInRental, 
    tax, 
    totalPriceOfRental
  } = calculateTotalBillOfTheBooking({ checkIn: range?.from, checkOut: range?.to, priceOfTheRental: price });


  return (
    <Card className='p-8 mb-4'>

      <CardTitle className='mb-8'>Booking Summary</CardTitle>
      

      <FormRow label={`₹${price} x ${totalNoOfDaysUserHasBookedTheRental} days`} amount={subTotal} />

      <FormRow label='Clearning Charge' amount={cleaningChargeInRental} />

      <FormRow label='Service Charge' amount={serviceChargeInRental} />

      <FormRow label='Tax' amount={tax} />


      <Separator className='mt-4' />


      <CardTitle className='mt-8'>

        <FormRow label='Booking Total' amount={totalPriceOfRental} />

      </CardTitle>


    </Card>
  )
}

export default BookingForm;