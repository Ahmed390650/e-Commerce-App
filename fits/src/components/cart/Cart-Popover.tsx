"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { convertToLocale } from "@/lib/utils/money";
import LineItemPrice from "@/modules/products/components/product-content/LineItemPrice";
import ProductDescription from "@/modules/products/components/product-content/product-descp";
import ProductTitle from "@/modules/products/components/product-content/product-title";
import ProductImage from "@/modules/products/components/product-info/Product-image";
import { HttpTypes } from "@medusajs/types";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { CartProvider, useCart } from ".";
import { ProductProvider, useProduct } from "../product";
import {
  CartQtyBox,
  DeleteButton,
} from "../product/product-line-cart/line-actions";
import { Button } from "../ui/button";
type CartPopoverProps = {
  cart: HttpTypes.StoreCart | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const CartPopover = ({ cart, isOpen, setIsOpen }: CartPopoverProps) => {
  return (
    <CartProvider cart={cart}>
      <Sheet modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <CartContent />
      </Sheet>
    </CartProvider>
  );
};
const CartContent = () => {
  const { cart } = useCart();
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;
  const itemSorted = cart?.items?.sort((a, b) => {
    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
  });
  return (
    <>
      {!itemSorted ||
        (itemSorted.length !== 0 && (
          <SheetContent
            side="right"
            className="w-full sm:w-[400px] md:w-[500px] flex flex-col"
          >
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
                <ProductProvider
                  key={item.id}
                  product={item.product}
                  countryCode={cart?.currency_code}
                >
                  <ProductItem item={item} />
                </ProductProvider>
              ))}
            </div>
            <CartFotter />
          </SheetContent>
        ))}
    </>
  );
};
const ProductItem = ({ item }: { item: HttpTypes.StoreCartLineItem }) => {
  const { isMutating, countryCode } = useProduct();

  return (
    <li className="py-[20px] p-0 border-b last:border-none relative min-h-[6.25rem] bg-clip-padding list-none ">
      {isMutating && (
        <div className="absolute grid items-center justify-center w-full h-full z-10 ">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
      <div className="flex w-full">
        <ProductImage product={item.product} />
        <div className="flex flex-col gap-y-[4px] justify-around py-0 px-[10px] cursor-pointer">
          <ProductTitle title={item.title} />
          <ProductDescription description={item.product_description} />
          <span>{item.variant?.title}</span>
          <CartQtyBox item={item} />
        </div>
        <div className="flex  flex-col w-full grow shrink basis-0 ">
          <div className="flex justify-end">
            <DeleteButton item={item} />
          </div>
          <div className="mt-auto flex flex-col items-end justify-end">
            <span className="">
              <LineItemPrice currencyCode={countryCode} item={item} />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
const CartFotter = () => {
  const { cart } = useCart();
  return (
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
      <Button asChild className="uppercase rounded-sm h-[45px] cursor-pointer">
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
  );
};
export default CartPopover;
