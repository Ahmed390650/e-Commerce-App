import { retrieveCart } from "@/lib/data/cart";
import Cart from "@/modules/cart/templates";
import React from "react";

const page = async () => {
  const cart = await retrieveCart().catch(() => null);
  if (!cart) {
    return <div>Your cart is empty</div>;
  }
  return <Cart cart={cart} />;
};

export default page;
