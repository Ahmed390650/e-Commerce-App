import { Button } from "@/components/ui/button";
import { retrieveCart } from "@/lib/data/cart";
import Cart from "@/modules/cart/templates";
import Link from "next/link";
import React from "react";

const page = async () => {
  const cart = await retrieveCart().catch(() => null);
  if (!cart || cart.items?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 h-full gap-5">
        Empty Cart
        <Button asChild>
          <Link href={"/"}>Back Home</Link>
        </Button>
      </div>
    );
  }
  return <Cart cart={cart} />;
};

export default page;
