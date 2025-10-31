"use client"; // include with Next.js 13+
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HttpTypes } from "@medusajs/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import { useSetupPaymentSession } from "./useListPaymentProvider";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "temp");
export default function CheckoutPaymentStep({
  cart,
}: {
  cart: HttpTypes.StoreCart;
}) {
  const { clientSecret, isOpen } = useSetupPaymentSession({
    region_id: cart?.region_id || "",
    cart,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      {isOpen && clientSecret ? (
        <CardContent>
          <Elements
            stripe={stripe}
            options={{
              clientSecret,
            }}
          >
            <StripeForm clientSecret={clientSecret} cart={cart} />
          </Elements>
        </CardContent>
      ) : (
        <CardContent>
          <span>no payment provider</span>
        </CardContent>
      )}
    </Card>
  );
}
