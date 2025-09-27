import { HttpTypes } from "@medusajs/types";
import React from "react";
import CartLineProduct from "../cart-line";
import { ProductProvider } from "@/components/product";

interface ListProductsLinesProps {
  cart: HttpTypes.StoreCart;
}
const ListProductsLines = ({ cart }: ListProductsLinesProps) => {
  if (!cart.items) {
    return null;
  }
  return (
    <div className="border flex flex-col rounded-[8px] w-full h-fit  transition-[max-height] duration-1000 ease-in-out overflow-hidden">
      {cart.items.map((item) => (
        <ProductProvider
          product={item.product}
          variantId={item.variant?.id}
          key={item.id}
        >
          <CartLineProduct item={item} currenyCode={cart.currency_code} />
        </ProductProvider>
      ))}
    </div>
  );
};

export default ListProductsLines;
