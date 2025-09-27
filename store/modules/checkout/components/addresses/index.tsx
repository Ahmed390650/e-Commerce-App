"use client";

import { Separator } from "@/components/ui/separator";
import { HttpTypes } from "@medusajs/types";
import { CheckCheckIcon, Loader2Icon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import ShippingAddress from "../shipping-address";
import { SubmitButton } from "../submit-button";
import ErrorMessage from "../error-message";
import BillingAddress from "../billing_address";
import compareAddresses from "@/lib/utils/compare-addresses";
import { useToggleState } from "@/lib/hooks/useToggleState";
import { setAddresses } from "@/lib/data/cart";
import { Button } from "@/components/ui/button";

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "address";

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  );

  const handleEdit = () => {
    router.push(pathname + "?step=address");
  };

  const [message, formAction] = useActionState(setAddresses, null);

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="flex flex-row text-3xl-regular gap-x-2 items-baseline">
          Shipping Address
          {!isOpen && <CheckCheckIcon />}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <span>
            <Button
              onClick={handleEdit}
              variant={"outline"}
              data-testid="edit-address-button"
            >
              Edit
            </Button>
          </span>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <h2 className="text-3xl-regular gap-x-4 pb-6 pt-8">
                  Billing address
                </h2>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <h2 className="txt-medium-plus text-ui-fg-base mb-1">
                      Shipping Address
                    </h2>
                    <h2 className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </h2>
                    <h2 className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </h2>
                    <h2 className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </h2>
                    <h2 className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </h2>
                  </div>

                  <div
                    className="flex flex-col w-1/3 "
                    data-testid="shipping-contact-summary"
                  >
                    <h2 className="txt-medium-plus text-ui-fg-base mb-1">
                      Contact
                    </h2>
                    <h2 className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.phone}
                    </h2>
                    <h2 className="txt-medium text-ui-fg-subtle">
                      {cart.email}
                    </h2>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <h2 className="txt-medium-plus text-ui-fg-base mb-1">
                      Billing Address
                    </h2>

                    {sameAsBilling ? (
                      <h2 className="txt-medium text-ui-fg-subtle">
                        Billing and delivery address are the same.
                      </h2>
                    ) : (
                      <>
                        <h2 className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </h2>
                        <h2 className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </h2>
                        <h2 className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </h2>
                        <h2 className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </h2>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Loader2Icon className="animate-spin " />
              </div>
            )}
          </div>
        </div>
      )}
      <Separator className="mt-8" />
    </div>
  );
};

export default Addresses;
