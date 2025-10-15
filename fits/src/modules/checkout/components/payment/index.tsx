"use client";

import { isStripe as isStripeFunc, paymentInfoMap } from "@/lib/constants";
import { initiatePaymentSession } from "@/lib/data/cart";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { StripeContext } from "../payment-wrapper/stripe-wrapper";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HttpTypes } from "@medusajs/types";
import { CheckCircle2, CreditCard } from "lucide-react";

interface PaymentProps {
  cart: HttpTypes.StoreCart;
  availablePaymentMethods: any[];
}

export default function Payment({
  cart,
  availablePaymentMethods,
}: PaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripeComplete, setStripeComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  const stripeReady = useContext(StripeContext);
  const stripe = stripeReady ? useStripe() : null;
  const elements = stripeReady ? useElements() : null;

  const [cardBrand, setCardBrand] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSession = cart?.payment_collection?.payment_sessions?.find(
    (session: any) => session.status === "pending"
  );

  const isOpen = searchParams.get("step") === "payment";
  const isStripe = isStripeFunc(selectedPaymentMethod);
  const paidByGiftcard = cart?.gift_cards?.length > 0 && cart?.total === 0;
  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const setPaymentMethod = async (method: string) => {
    setError(null);
    setSelectedPaymentMethod(method);
    if (isStripeFunc(method)) {
      await initiatePaymentSession(cart, { provider_id: method });
    }
  };

  const handlePaymentElementChange = (
    event: StripePaymentElementChangeEvent
  ) => {
    if (event.value.type) setSelectedPaymentMethod(event.value.type);
    setStripeComplete(event.complete);
    if (event.complete) setError(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!stripe || !elements) {
        setError("Payment processing not ready. Please try again.");
        return;
      }
      await elements.submit();
      router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const initStripe = useCallback(
    () => async () => {
      try {
        await initiatePaymentSession(cart, {
          provider_id: "pp_stripe_stripe",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to initialize payment. Please try again.");
      }
    },
    [cart]
  );

  useEffect(() => {
    if (!activeSession && isOpen) initStripe();
  }, [cart, isOpen, activeSession, initStripe]);

  useEffect(() => setError(null), [isOpen]);

  return (
    <Card className="p-6 shadow-sm border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            Payment
            {!isOpen && paymentReady && (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            )}
          </CardTitle>
        </div>
        {!isOpen && paymentReady && (
          <Button variant="link" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {isOpen ? (
          <>
            {!paidByGiftcard &&
              availablePaymentMethods?.length &&
              stripeReady && (
                <div className="mt-4">
                  <PaymentElement
                    onChange={handlePaymentElementChange}
                    options={{ layout: "accordion" }}
                  />
                </div>
              )}

            {paidByGiftcard && (
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Payment method: Gift card
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </>
        ) : (
          <>
            {cart && paymentReady && activeSession && (
              <div className="flex flex-col md:flex-row gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Payment method
                  </p>
                  <p className="text-base">
                    {paymentInfoMap[activeSession?.provider_id]?.title ||
                      activeSession?.provider_id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Payment details
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-muted">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <p className="text-base">
                      {isStripeFunc(selectedPaymentMethod) && cardBrand
                        ? cardBrand
                        : "Another step will appear"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      {isOpen && (
        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={handleSubmit}
            disabled={
              (isStripe && !stripeComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            isLoading={isLoading}
          >
            {!activeSession && isStripeFunc(selectedPaymentMethod)
              ? "Enter card details"
              : "Continue to review"}
          </Button>
        </CardFooter>
      )}

      <Separator className="mt-6" />
    </Card>
  );
}
