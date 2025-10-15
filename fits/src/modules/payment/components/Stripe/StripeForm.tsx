"use client";
import { useCart } from "@/components/cart";
import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { sdk } from "@/lib/sdk";
import { Button } from "@/components/ui/button";

const StripeForm = ({ clientSecret }: { clientSecret: string }) => {
  const { cart, refreshCart } = useCart();
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  async function handlePayment(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const card = elements?.getElement(CardElement);
    if (!stripe || !elements || !card || !cart || !clientSecret) {
      return;
    }
    setLoading(true);
    stripe
      ?.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: cart.billing_address?.first_name,
            email: cart.email,
            phone: cart.billing_address?.phone,
            address: {
              city: cart.billing_address?.city,
              country: cart.billing_address?.country_code,
              line1: cart.billing_address?.address_1,
              line2: cart.billing_address?.address_2,
              postal_code: cart.billing_address?.postal_code,
            },
          },
        },
      })
      .then(({ error }) => {
        if (error) {
          // TODO handle errors
          console.error(error);
          return;
        }

        sdk.store.cart.complete(cart.id).then((data) => {
          if (data.type === "cart" && data.cart) {
            // an error occured
            console.error(data.error);
          } else if (data.type === "order" && data.order) {
            // TODO redirect to order success page
            alert("Order placed.");
            console.log(data.order);
            refreshCart();
          }
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <form>
      <CardElement />
      <Button
        className="cursor-pointer"
        onClick={handlePayment}
        disabled={loading}
      >
        Place Order
      </Button>
    </form>
  );
};

export default StripeForm;
