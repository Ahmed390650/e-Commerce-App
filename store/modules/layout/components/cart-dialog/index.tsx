"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useDeleteLineItemCart from "@/lib/hooks/useDeleteLine";
import useUpdateQty from "@/lib/hooks/useUpdateQty";
import { convertToLocale } from "@/lib/utils/money";
import LineItemPrice from "@/modules/products/components/product-content/LineItemPrice";
import ProductDescription from "@/modules/products/components/product-content/product-descp";
import ProductTitle from "@/modules/products/components/product-content/product-title";
import QtyBox from "@/modules/products/components/product-content/qty-Box";
import ProductImage from "@/modules/products/components/product-info/Product-image";
import { HttpTypes } from "@medusajs/types";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
const CartPopover = ({
  cart,
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  cart: HttpTypes.StoreCart | null;
}) => {
  const { Mutatedelete, isDeleteing } = useDeleteLineItemCart();
  const { isUpdating, updateMutate } = useUpdateQty();

  const changeQuantity = (quantity: number, lineId: string) => {
    updateMutate({
      lineId,
      quantity,
    });
  };
  if (!cart) {
    return null;
  }
  const handleDelete = async (id: string) => {
    Mutatedelete(id);
  };
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;
  const isMutation = isDeleteing || isUpdating;
  const itemSorted = cart.items?.sort((a, b) => {
    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>افتاح</Button>
      </SheetTrigger>
      {!itemSorted ||
        (itemSorted.length === 0 && (
          <SheetContent
            side="right"
            className="w-full sm:w-[400px] md:w-[500px] flex flex-col"
          >
            {isMutation && (
              <div className="absolute grid items-center justify-center w-full h-full z-10 bg-black/20">
                <Loader2Icon className="animate-spin" />
              </div>
            )}
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription className="flex justify-between mt-5">
                <span className="font-extrabold uppercase text-black text-[0.938em]">
                  Items Added To Bag
                </span>
                <span>{totalItems}</span>
              </SheetDescription>
            </SheetHeader>

            <div className="overflow-y-auto overflow-x-hidden px-4  max-h-[450px]">
              {itemSorted.map((item) => (
                <li
                  key={item.id}
                  className="py-[20px] p-0 border-b last:border-none relative min-h-[6.25rem] bg-clip-padding list-none"
                >
                  <div className="flex w-full">
                    <ProductImage product={item.product} />
                    <div className="flex flex-col gap-y-[4px] justify-around py-0 px-[10px] cursor-pointer">
                      <ProductTitle title={item.title} />
                      <ProductDescription
                        description={item.product_description}
                      />
                      <span>{item.variant?.title}</span>
                      <QtyBox item={item} changeQuantity={changeQuantity} />
                    </div>
                    <div className="flex  flex-col w-full grow shrink basis-0 ">
                      <div className="flex justify-end">
                        <Trash2Icon
                          onClick={() => handleDelete(item.id)}
                          className="size-4 cursor-pointer stroke-red-500"
                        />
                      </div>
                      <div className="mt-auto flex flex-col items-end justify-end">
                        <span className="">
                          <LineItemPrice
                            currencyCode={cart.currency_code}
                            item={item}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <SheetFooter className="border-t">
              <div className="flex justify-between text-[1.125em] font-semibold ">
                <span>Subtotal:</span>
                <span>
                  {convertToLocale({
                    amount: cart.original_total,
                    currency_code: cart.currency_code,
                  })}
                </span>
              </div>
              <Button
                asChild
                className="uppercase rounded-sm h-[45px] cursor-pointer"
              >
                <Link href={`/cart`}>View Bag</Link>
              </Button>
              <SheetClose asChild>
                <Button
                  className=" w-full rounded-sm h-[45px] cursor-pointer "
                  variant={"ghost"}
                >
                  Continue Shopping
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        ))}
    </Sheet>
  );
};

export default CartPopover;
