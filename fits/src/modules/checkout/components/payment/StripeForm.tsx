import { Button } from "@/components/ui/button";
import { HttpTypes } from "@medusajs/types";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Loader2Icon } from "lucide-react";
import React from "react";
import usePaymentSubmit from "./usePaymentSubmit";

const StripeForm = ({
  clientSecret,
  cart,
}: {
  clientSecret: string;
  cart?: HttpTypes.StoreCart;
}) => {
  const { checkout, isPending: loading } = usePaymentSubmit({ cart });
  const handlePayment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!cart) {
      return;
    }
    checkout({ clientSecret });
  };
  return (
    <>
      <PaymentElement
        options={{
          layout: "accordion",
        }}
      />

      <Button onClick={handlePayment} disabled={loading}>
        {loading ? <Loader2Icon className="animate-spin" /> : "Pay"}
      </Button>
    </>
  );
};

export default StripeForm;
