import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { retrieveCart } from "@/lib/data/cart";
import { ShoppingBasket, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null);

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;
  return (
    <Button variant={"ghost"} asChild className="relative">
      <Link href={"/cart"}>
        <ShoppingCartIcon size={200} />
        <span className="absolute top-0 -left-2 rounded-full bg-red-500 text-white min-w-[16px] min-h-[16px] text-center">
          {totalItems}
        </span>
      </Link>
    </Button>
  );
}
