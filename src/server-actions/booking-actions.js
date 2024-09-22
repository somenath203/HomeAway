'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import primsaClientConfig from '@/prismaClientConfig';
import { calculateTotalBillOfTheBooking } from '@/utils/calculatebookingtotal';


const getAuthenticatedUser = async () => {

    try {
        
        const user = await currentUser();


        if (!user) {
            throw new Error('you must be authenticated in order to access this route');
        }

        if(!user?.privateMetadata?.hasProfile) {
            redirect('/profile/create');
        }


        return user;


    } catch (error) {

        console.log(error);

        return {
            message: error?.message 
        }

    }

}


export const createNewBookingOfProperty = async (prevState) => {

    let bookingId = null; 


    try {

        const user = await getAuthenticatedUser();

        await primsaClientConfig.booking.deleteMany({
            where: {
                idOfTheProfileWhoBookedTheProperty: user.id,
                paymentStatus: false
            }
        });

        const { propertyId, range } = prevState;

        const propertyToBeBooked = await primsaClientConfig.property.findUnique({
            where: {
                id: propertyId
            },
            select: {
                price: true 
            }
        });

        
        if(!propertyToBeBooked) {

            return {
                message: 'property not found'
            }

        }

        const { totalNoOfDaysUserHasBookedTheRental, totalPriceOfRental } = calculateTotalBillOfTheBooking({
            checkIn: range?.from,
            checkOut: range?.to,
            priceOfTheRental: propertyToBeBooked.price
        });

        const newBookingCreated = await primsaClientConfig.booking.create({
            data: {
              checkIn: range?.from,
              checkOut: range?.to,
              orderTotal: totalPriceOfRental,
              totalNights: totalNoOfDaysUserHasBookedTheRental,
              idOfTheProfileWhoBookedTheProperty: user.id,
              idOfThePropertyWhichIsBooked: propertyId,
            }
        });


        bookingId = newBookingCreated.id;
          

    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while creating a new booking, please try again'
        }

    }

    
    redirect(`/checkout?bookingId=${bookingId}`);

}


export const fetchAllBookingsOfTheUser = async () => {


    try {

        const user = await getAuthenticatedUser();

        const allBookingsOfTheUser = await primsaClientConfig.booking.findMany({
            where: {
                idOfTheProfileWhoBookedTheProperty: user.id,
                paymentStatus: true
            },
            include: {
                property: {
                    select: {
                        id: true,
                        name: true,
                        country: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return allBookingsOfTheUser;
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while fetching all the bookings, please try again'
        }

    }

}


export const deleteParticularBooking = async (prevState) => {

    try {

        const { bookingId } = prevState;

        const user = await getAuthenticatedUser();

        await primsaClientConfig.booking.delete({
            where: {
                id: bookingId,
                idOfTheProfileWhoBookedTheProperty: user.id
            }
        });

        revalidatePath('/bookings');

        return {
            message: 'booking has been deleted successfully'
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while deleting the booking, please try again'
        }

    }

}


