import Stripe from "stripe";
import { redirect } from "next/navigation";

import prismaClientConfig from '@/prismaClientConfig';
import { NextResponse } from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const GET = async (req) => {

    try {
        
        const { searchParams } = new URL(req.url);

        const session_id = searchParams.get('session_id');

        const session = await stripe.checkout.sessions.retrieve(session_id);

        const bookingId = session.metadata?.bookingId;


        if(session.status !== 'complete' || !bookingId) {

            throw new Error('something went wrong during the payment process');

        } 

        await prismaClientConfig.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                paymentStatus: true
            }
        });


    } catch (error) {
        
        console.log(error);

        return NextResponse.json(null, {
            status: 500,
            statusText: 'something went wrong during the payment process'
        });
        
    }


    redirect('/bookings');

}