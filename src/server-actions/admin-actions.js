'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import primsaClientConfig from '@/prismaClientConfig';
import { formatDate } from '@/utils/formatedate';


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


const getAdminUser = async () => {

    try {

        const user = await getAuthenticatedUser();

        if (user.id !== process.env.ADMIN_CLERK_USER_ID) {

            redirect('/');

        }

        return user;
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message 
        }

    }

}


export const fetchStatisticsOfTheEntireApplication = async () => {

    try {

        await getAdminUser();


        const totalNumberOfUsersInTheApplication = await primsaClientConfig.profile.count();

        const totalNumberOfPropertiesInTheApplication = await primsaClientConfig.property.count();
        
        const totalNumberOfBookingsInTheApplication = await primsaClientConfig.booking.count({
            where: {
                paymentStatus: true
            }
        });


        return {
            totalNumberOfUsersInTheApplication: totalNumberOfUsersInTheApplication,
            totalNumberOfPropertiesInTheApplication: totalNumberOfPropertiesInTheApplication,
            totalNumberOfBookingsInTheApplication: totalNumberOfBookingsInTheApplication
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while fetching the statistics, please try again'
        }

    }

}


export const fetchChartsDataOfTotalNumberOfBookingsPerMonth = async () => {

    try {

        await getAdminUser();

        const date = new Date();
        
        date.setMonth(date.getMonth() - 6); 

        const sixMonthsAgoDate = date; 

        const lastSixMonthsBooking = await primsaClientConfig.booking.findMany({
            where: {
                paymentStatus: true,
                createdAt: {
                    gte: sixMonthsAgoDate 
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });


        const bookingsPerMonth = lastSixMonthsBooking.reduce((total, currentBookingData) => {

            const currentBookingDataDate = formatDate(currentBookingData.createdAt, true);

            const isDateAlreadyExistInTheTotalArray = total.find((entryDate) => entryDate.currentBookingDataDate === currentBookingDataDate);


            if(isDateAlreadyExistInTheTotalArray) {

                isDateAlreadyExistInTheTotalArray.total_number_of_bookings_this_month += 1;

            } else {

                total.push({ currentBookingDataDate, total_number_of_bookings_this_month: 1 });

            }

            return total;

        }, []);


        return bookingsPerMonth;
        

    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while fetching the charts data, please try again'
        }

    }

}