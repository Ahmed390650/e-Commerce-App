"use client";
import { Button } from "@/components/ui/button";
import useDeleteLineItemCart from "@/lib/hooks/useDeleteLine";
import useUpdateQty from "@/lib/hooks/useUpdateQty";
import { convertToLocale } from "@/lib/utils/money";
import ProductTitle from "@/modules/products/components/product-content/product-title";
import QtyBox from "@/modules/products/components/product-content/qty-Box";
import { HttpTypes } from "@medusajs/types";
import { HeartIcon, Loader2Icon, TractorIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Cart = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const { isUpdating, updateMutate } = useUpdateQty();
  const { Mutatedelete, isDeleteing } = useDeleteLineItemCart();
  const changeQuantity = (quantity: number, lineId: string) => {
    updateMutate({
      lineId,
      quantity,
    });
  };
  const DeleteLineItem = (lineId: string) => {
    Mutatedelete(lineId);
  };
  const itemSorted = cart.items?.sort((a, b) => {
    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
  });
  const isMutating = isDeleteing || isUpdating;
  return (
    <div className="relative min-h-screen ">
      {isMutating && (
        <div className="absolute inset-0 grid place-items-center bg-black/2 z-50 w-full">
          <Loader2Icon className="animate-spin w-8 h-8" />
        </div>
      )}
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
              <ProductList
                currency_code={cart.currency_code}
                deleteLineItem={DeleteLineItem}
                product={itemSorted}
                changeQuantity={changeQuantity}
              />
            </div>
            <div className="flex flex-col gap-y-[20px] h-full relative mx-0 my-[2rem] basis-[33.33333333%] max-w-[33.33333333%]">
              <div className="flex gap-y-[20px] w-full flex-col box-border">
                <h2 className="flex justify-start text-[20px] font-bold uppercase h-[25px]">
                  Order Summary
                </h2>
                <div className="flex  mx-0   flex-col justify-between bg-[#FFF] border rounded-[10px] gap-y-[10px] px-[20px] py-[15px]">
                  <div className="flex  items-center object-contain text-[16px] font-semibold justify-between">
                    <span className="text-[16px] font-semibold">Subtotal</span>
                    <span className="text-[16px] font-semibold">
                      {convertToLocale({
                        amount: cart.item_total,
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
                        Grand Total
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
            <Button className="h-[2.813rem] uppercase text-[0.938em]  font-semibold  cursor-pointer px-[2.5rem]">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const ProductList = ({
  product,
  changeQuantity,
  deleteLineItem,
  currency_code,
}: {
  product?: HttpTypes.StoreCartLineItem[];
  changeQuantity: (quantity: number, lineId: string) => void;
  currency_code: string;
  deleteLineItem: (lineId: string) => void;
}) => {
  if (!product || product.length === 0) {
    return <div>Your cart is empty</div>;
  }
  return (
    <div className="border flex flex-col rounded-[8px] w-full h-fit  transition-[max-height] duration-1000 ease-in-out overflow-hidden">
      {product.map((item) => (
        <div
          key={item.id}
          className="flex flex-col border-b last:border-b-0 bg-white w-full h-full my-[8px] mx-0"
        >
          <div className="flex justify-between relative py-[10px] px-0">
            <div className="flex px-[10px] py-0 justify-center items-center w-full h-full cursor-pointer basis-[20%] ">
              <Image
                src={item.thumbnail || ""}
                alt={item.title}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col justify-center gap-y-[8px] py-[10px] px-0 basis-[20%]">
              <ProductTitle title={item.title} />
              <span>{item.variant?.title}</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-[8px] basis-[20%]">
              <QtyBox item={item} changeQuantity={changeQuantity} />
            </div>
            <div className="flex  justify-center basis-[20%] items-center">
              <div className="flex flex-col justify-end">
                <span>
                  {convertToLocale({ amount: item.total, currency_code })}
                </span>
              </div>
            </div>
            <div className="flex justify-center  items-center basis-[12.5%]">
              <div className="flex flex-col gap-y-[1rem] cursor-pointer items-center">
                <Trash2Icon
                  size={18}
                  onClick={() => deleteLineItem(item.id)}
                  className="stroke-current hover:stroke-red-500 fill-none hover:fill-red-500 cursor-pointer transition-colors "
                />
                <HeartIcon
                  size={22}
                  className="stroke-current hover:stroke-red-500 fill-none hover:fill-red-500 cursor-pointer transition-colors "
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Cart;
