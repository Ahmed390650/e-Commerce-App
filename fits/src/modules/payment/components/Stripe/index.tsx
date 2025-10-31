"use client";
import { HttpTypes } from "@medusajs/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "temp");
const StripePayment = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const clientSecret = cart?.payment_collection?.payment_sessions?.[0].data
    .client_secret as string;
  return (
    <div>
      <Elements
        stripe={stripe}
        options={{
          clientSecret,
        }}
      >
        <StripeForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};

export default StripePayment;
