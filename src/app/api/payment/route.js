import Stripe from "stripe";

import prismaClientConfig from '@/prismaClientConfig';
import { formatDate } from "@/utils/formatedate";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const POST = async (req, res) => {

    try {

       const requestHeaders = new Headers(req.headers);

       
       const origin = requestHeaders.get('origin');


       const { bookingId } = await req.json();


       const booking = await prismaClientConfig.booking.findUnique({
        where: {
            id: bookingId
        },
        include: {
            property: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
       });


       if(!booking) {

        return Response.json(null, {
            status: 404,
            statusText: 'booking not found'
        });

       };


       const { totalNights, orderTotal, checkIn, checkOut, property: { name, image } } = booking;


       const stripeSession = await stripe.checkout.sessions.create({
        ui_mode: 'embedded', 
        metadata: {
            bookingId: booking.id
        },
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `${name}`,
                        images: [image],
                        description: `Enjoy an unforgettable ${totalNights}-days stay from ${formatDate(checkIn)} to ${formatDate(checkOut)} at this exceptional destination. Relax, unwind, and savor every moment of your getaway!`
                    },
                    unit_amount: orderTotal * 100
                }
            }
        ],
        mode: 'payment',
        return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`
       });

       return Response.json({
        clientSecret: stripeSession.client_secret
       });

    } catch (error) {
        
        console.log(error);

        return Response.json(null, {
            status: 500,
            statusText: 'Payment failed due to Internal Server Error.'
        });
        
    }

}