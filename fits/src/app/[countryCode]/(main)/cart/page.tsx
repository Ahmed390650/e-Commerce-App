import { Button } from "@/components/ui/button";
import { retrieveCart } from "@/lib/data/cart";
import { listRegions } from "@/lib/data/regions";
import Cart from "@/modules/cart/templates";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ orderNumber: string; session_id: string }>;
}) => {
  const [payment, cart] = await Promise.all([searchParams, retrieveCart()]);
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
  return <Cart cart={cart} payment={payment} />;
};

export default page;
