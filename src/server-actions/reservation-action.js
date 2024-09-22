'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import primsaClientConfig from '@/prismaClientConfig';



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


export const fetchAllReservationsOfTheCurrentlyLoggedInUser = async () => {


    try {

        
        const user = await getAuthenticatedUser();


        const allReservationsOfTheCurrentlyLoggedInUser = await primsaClientConfig.booking.findMany({
            where: {
                idOfTheProfileWhoBookedTheProperty: user.id,  
                paymentStatus: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                property: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        country: true
                    }
                }
            }
        });
        


        return allReservationsOfTheCurrentlyLoggedInUser;

        
    } catch (error) {
        
        return {

            message: error?.message || 'there was an error while fetching the reservations of the currently logged in user, please try again'

        }

    }

}


