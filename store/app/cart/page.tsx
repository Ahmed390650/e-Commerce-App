import { retrieveCart } from "@/lib/data/cart";
import React from "react";

const page = async () => {
  const cart = await retrieveCart().catch(() => null);

  console.log(cart);
  return <div>page</div>;
};

export default page;
