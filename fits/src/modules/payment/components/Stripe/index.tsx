"use client";
import { useCart } from "@/components/cart";
import React from "react";
import StripeForm from "./StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "temp");
const StripePayment = () => {
  const { cart } = useCart();
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
