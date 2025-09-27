import { retrieveCart } from "@/lib/data/cart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null);
  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  return (
    <Link href={"/cart"} className="relative inline-block">
      {/* Cart Icon */}
      <ShoppingCartIcon size={20} />

      {/* Badge (total items) */}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
