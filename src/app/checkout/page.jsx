'use client';

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";


const Page = () => {

  const searchParams = useSearchParams();

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


  const bookingId = searchParams.get('bookingId');


  const fetchClientSecret = useCallback(async () => {

    const response = await axios.post('/api/payment', {
      bookingId: bookingId
    });

    return response.data.clientSecret;

  }, []);


  
  const options = {
    fetchClientSecret: fetchClientSecret
  }
  
  return (
    <div id="checkout">

      <EmbeddedCheckoutProvider 
        stripe={stripePromise} 
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>

    </div>
  )
};


export default Page;