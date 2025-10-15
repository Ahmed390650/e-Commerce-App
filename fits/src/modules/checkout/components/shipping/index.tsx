"use client";

import { HttpTypes } from "@medusajs/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { calculatePriceForShippingOption } from "@/lib/data/fulfillment";
import { cn } from "@/lib/utils";
import { convertToLocale } from "@/lib/utils/money";
import { CheckCircle2, Loader2 } from "lucide-react";
import ErrorMessage from "../error-message";

const PICKUP_OPTION_ON = "__PICKUP_ON";
const PICKUP_OPTION_OFF = "__PICKUP_OFF";

interface ShippingProps {
  cart: HttpTypes.StoreCart;
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null;
}

export default function Shipping({
  cart,
  availableShippingMethods,
}: ShippingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [shippingMethodId, setShippingMethodId] = React.useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingPrices, setIsLoadingPrices] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showPickupOptions, setShowPickupOptions] =
    React.useState<string>(PICKUP_OPTION_OFF);
  const [calculatedPricesMap, setCalculatedPricesMap] = React.useState<
    Record<string, number>
  >({});

  const isOpen = searchParams.get("step") === "delivery";

  const shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  );
  const pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup"
  );

  const hasPickupOptions = !!pickupMethods?.length;

  React.useEffect(() => {
    async function loadCalculatedPrices() {
      if (!shippingMethods?.length) return;
      setIsLoadingPrices(true);
      try {
        const promises = shippingMethods
          .filter((sm) => sm.price_type === "calculated")
          .map((sm) => calculatePriceForShippingOption(sm.id, cart.id));

        const results = await Promise.allSettled(promises);
        const priceMap: Record<string, number> = {};
        results.forEach((r: any) => {
          if (r.status === "fulfilled" && r.value?.id) {
            priceMap[r.value.id] = r.value.amount;
          }
        });
        setCalculatedPricesMap(priceMap);
      } finally {
        setIsLoadingPrices(false);
      }
    }

    loadCalculatedPrices();
  }, [availableShippingMethods, shippingMethods, cart]);

  async function handleSetShippingMethod(
    id: string,
    variant: "shipping" | "pickup"
  ) {
    setError(null);
    setIsLoading(true);
    setShippingMethodId(id);
    if (variant === "pickup") setShowPickupOptions(PICKUP_OPTION_ON);
    else setShowPickupOptions(PICKUP_OPTION_OFF);

    try {
      // await setShippingMethod({ cartId: cart.id, shippingMethodId: id });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    router.push(`${pathname}?step=payment`, { scroll: false });
  }

  function handleEdit() {
    router.push(`${pathname}?step=delivery`, { scroll: false });
  }

  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Delivery{" "}
          {!isOpen && cart.shipping_methods?.length ? (
            <CheckCircle2 className="text-green-600" />
          ) : null}
        </h2>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <button
              onClick={handleEdit}
              className="text-sm text-primary hover:underline"
            >
              Edit
            </button>
          )}
      </div>

      {isOpen ? (
        <div className="space-y-8">
          {/* --- Shipping Methods --- */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Method</CardTitle>
              <CardDescription>
                Choose how you’d like your order delivered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={shippingMethodId || ""}
                onValueChange={(v) => handleSetShippingMethod(v, "shipping")}
                className="space-y-3"
              >
                {shippingMethods?.map((option) => {
                  const isDisabled =
                    option.price_type === "calculated" &&
                    !isLoadingPrices &&
                    typeof calculatedPricesMap[option.id] !== "number";

                  const price =
                    option.price_type === "flat"
                      ? option.amount
                      : calculatedPricesMap[option.id];

                  return (
                    <Label
                      key={option.id}
                      className={cn(
                        "flex justify-between items-center border rounded-lg p-4 cursor-pointer transition",
                        option.id === shippingMethodId
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/60",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={option.id} />
                        <span className="font-medium">{option.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {isDisabled ? (
                          "-"
                        ) : isLoadingPrices &&
                          option.price_type === "calculated" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          convertToLocale({
                            amount: price || 0,
                            currency_code: cart.currency_code,
                          })
                        )}
                      </span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* --- Pickup Options --- */}
          {hasPickupOptions && (
            <Card>
              <CardHeader>
                <CardTitle>Pickup Options</CardTitle>
                <CardDescription>
                  Prefer to collect from a store near you?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={shippingMethodId || ""}
                  onValueChange={(v) => handleSetShippingMethod(v, "pickup")}
                  className="space-y-3"
                >
                  {pickupMethods?.map((option) => (
                    <Label
                      key={option.id}
                      className={cn(
                        "flex justify-between items-start border rounded-lg p-4 cursor-pointer transition",
                        option.id === shippingMethodId
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/60",
                        option.insufficient_inventory &&
                          "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.id} />
                          <span className="font-medium">{option.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground ml-7">
                          {option.service_zone?.fulfillment_set?.location
                            ?.address?.address_1 || ""}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {convertToLocale({
                          amount: option.amount!,
                          currency_code: cart.currency_code,
                        })}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {/* --- Error + Continue --- */}
          <div className="space-y-3">
            <ErrorMessage error={error} />
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={isLoading || !shippingMethodId}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Continue to Payment
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {cart?.shipping_methods?.length ? (
            <div>
              <p className="font-medium mb-1">Method</p>
              <p className="text-sm text-muted-foreground">
                {cart.shipping_methods.at(-1)?.name}{" "}
                {convertToLocale({
                  amount: cart.shipping_methods.at(-1)?.amount!,
                  currency_code: cart.currency_code,
                })}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No delivery set</p>
          )}
        </div>
      )}

      <Separator className="mt-8" />
    </div>
  );
}
