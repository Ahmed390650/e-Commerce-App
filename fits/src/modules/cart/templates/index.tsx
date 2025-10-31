"use client";
import { CartProvider } from "@/components/cart";
import { Button } from "@/components/ui/button";
import { convertToLocale } from "@/lib/utils/money";
import { useClerk } from "@clerk/nextjs";
import { HttpTypes } from "@medusajs/types";
import Link from "next/link";
import ListProductsLines from "../components/product-list";
import usePaymentCheckout from "../hooks/usePayment";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { initiatePaymentSession, placeOrder } from "@/lib/data/cart";
import { sdk } from "@/lib/sdk";
function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address";
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery";
  } else {
    return "payment";
  }
}
type Payment = { orderNumber: string; session_id: string };
const Cart = ({
  cart,
  payment,
}: {
  cart: HttpTypes.StoreCart;
  payment?: Payment;
}) => {
  const { checkout, isPending } = usePaymentCheckout();
  const clerk = useClerk();
  React.useEffect(() => {
    if (payment?.orderNumber && payment?.session_id) {
      const handlePlaceOrder = async () => {
        await placeOrder(payment.orderNumber);
      };
      handlePlaceOrder();
    }
  }, [payment?.orderNumber, payment?.session_id, cart.id, , cart]);
  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const handleSubmit = async () => {
    const clerkUserId = clerk.user?.id;
    const customerEmail = clerk.user?.primaryEmailAddress?.emailAddress;
    const customerName = `${clerk.user?.firstName} ${clerk.user?.lastName}`;
    const orderNumber = cart.id;
    if (!clerkUserId || !customerEmail) return;

    checkout({
      cart,
      metadata: {
        clerkUserId,
        customerEmail,
        customerName,
        orderNumber,
      },
    });
  };
  return (
    <CartProvider cart={cart} key={cart.id}>
      <div className="relative min-h-screen ">
        <div className="h-full pb-[4rem]">
          <div className="h-full relative container mx-auto max-w-7xl">
            <div className="flex justify-between flex-nowrap gap-5">
              <div className="flex flex-col gap-y-[20px] my-[2rem] mx-0 basis-[66.66666667%] max-w-[66.666667%] ">
                <div className="flex justify-between items-center object-contain h-[25px]">
                  <div className="flex  items-baseline font-bold">
                    <span className="uppercase mr-[10px] flex items-baseline">
                      my bag
                    </span>
                    <span className="capitalize font-normal text-muted-foreground">
                      {totalItems} items
                    </span>
                  </div>
                </div>
                <ListProductsLines cart={cart} />
              </div>
              <div className="flex flex-col gap-y-[20px] h-full relative mx-0 my-[2rem] basis-[33.33333333%] max-w-[33.33333333%]">
                <div className="flex gap-y-[20px] w-full flex-col box-border">
                  <h2 className="flex justify-start text-[20px] font-bold uppercase h-[25px]">
                    Order Summary
                  </h2>
                  <div className="flex  mx-0   flex-col justify-between bg-[#FFF] border rounded-[10px] gap-y-[10px] px-[20px] py-[15px]">
                    <div className="flex  items-center object-contain text-[16px] font-semibold justify-between">
                      <span className="text-[16px] font-semibold">
                        Items total (without tax)
                      </span>
                      <span className="text-[16px] font-semibold">
                        {convertToLocale({
                          amount: cart.item_subtotal,
                          currency_code: cart.currency_code,
                        })}
                      </span>
                    </div>
                    <div className="flex  items-center object-contain text-[16px] font-semibold justify-between">
                      <span className="text-[16px] font-semibold">
                        total tax
                      </span>
                      <span className="text-[16px] font-semibold">
                        {convertToLocale({
                          amount: cart.tax_total,
                          currency_code: cart.currency_code,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-[14px] justify-between">
                      <span className="text-[14px]">Shipping Fee</span>
                      <span className="uppercase text-[14px] text-[#76d671] font-semibold">
                        free
                      </span>
                    </div>
                    <div className="flex items-center mt-[10px] justify-between">
                      <span className="flex items-center gap-x-[5px]">
                        <span className="text-[14px] font-semibold">
                          Final total amount
                        </span>
                        <span className="text-[9px] text-[#cdcdcd] font-semibold">
                          Including all taxes/duties
                        </span>
                      </span>
                      <span className="text-[16px] font-semibold">
                        {convertToLocale({
                          amount: cart.total,
                          currency_code: cart.currency_code,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[6.25rem] py-[1.25rem] fixed flex  bottom-0 left-0 right-0 w-auto justify-end items-center bg-white z-1 border-t">
            <div className="flex gap-x-[2.5rem] items-center justify-between ">
              <Link href={"/"} className="cursor-pointer">
                Add More Items
              </Link>
              <Button
                asChild
                className="h-[2.813rem] uppercase text-[0.938em]  font-semibold  cursor-pointer px-[2.5rem]"
              >
                <Link href="/checkout?step=shipping">proceed to checkout</Link>
                {/* <Button size={"lg"} onClick={handleSubmit} disabled={isPending}>
                  {isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button> */}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default Cart;
