import { calculateDaysBetween } from "./calendarutilsfunctions";


export const calculateTotalBillOfTheBooking = ({ checkIn, checkOut, priceOfTheRental }) => {

    const totalNoOfDaysUserHasBookedTheRental = calculateDaysBetween({ checkIn: checkIn, checkOut: checkOut });

    const subTotal = totalNoOfDaysUserHasBookedTheRental * priceOfTheRental;

    const cleaningChargeInRental = 21;

    const serviceChargeInRental = 21;

    const tax = subTotal * 0.1;

    const totalPriceOfRental = subTotal + cleaningChargeInRental + serviceChargeInRental + tax;

    return {
        totalNoOfDaysUserHasBookedTheRental: totalNoOfDaysUserHasBookedTheRental,
        subTotal: subTotal,
        cleaningChargeInRental: cleaningChargeInRental,
        serviceChargeInRental: serviceChargeInRental,
        tax: tax,
        totalPriceOfRental: totalPriceOfRental
    }

}