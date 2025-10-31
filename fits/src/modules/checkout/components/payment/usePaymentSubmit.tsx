import { HttpTypes } from "@medusajs/types";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import useCheckoutOrder from "../../hooks/useCheckoutOrder";

const usePaymentSubmit = ({ cart }: { cart?: HttpTypes.StoreCart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { checkout, isPending: isCheckoutloading } = useCheckoutOrder();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ clientSecret }: { clientSecret: string }) => {
      if (!stripe || !elements || !cart || !clientSecret) {
        throw new Error("Stripe is not initialized");
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      return await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          payment_method_data: {
            billing_details: {
              name:
                cart.billing_address?.first_name +
                " " +
                cart.billing_address?.last_name,
              address: {
                city: cart.billing_address?.city ?? undefined,
                country: cart.billing_address?.country_code ?? undefined,
                line1: cart.billing_address?.address_1 ?? undefined,
                line2: cart.billing_address?.address_2 ?? undefined,
                postal_code: cart.billing_address?.postal_code ?? undefined,
                state: cart.billing_address?.province ?? undefined,
              },
              email: cart.email,
              phone: cart.billing_address?.phone ?? undefined,
            },
          },
        },
        redirect: "if_required",
      });
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess({ error, paymentIntent }) {
      if (error) {
        const pi = error.payment_intent;

        if (
          (pi && pi.status === "requires_capture") ||
          (pi && pi.status === "succeeded")
        ) {
          checkout(cart?.id);
          return;
        }
        toast.error(error.message);
        return;
      }

      if (
        paymentIntent.status === "requires_capture" ||
        paymentIntent.status === "succeeded"
      ) {
        checkout(cart?.id);
      }
    },
  });
  return {
    checkout: React.useCallback(mutate, [mutate]),
    isPending: isCheckoutloading || isPending,
  };
};

export default usePaymentSubmit;
