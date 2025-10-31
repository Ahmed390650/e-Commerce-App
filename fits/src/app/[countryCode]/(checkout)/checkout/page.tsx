import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import CheckoutForm from "@/modules/checkout/templates/checkout-form";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function Checkout() {
  const cart = await retrieveCart();
  const user = await auth();

  if (!cart) {
    return notFound();
  }
  if (!user.userId) {
    return redirect("/sign-in");
  }
  const customer = await retrieveCustomer();

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <CheckoutForm cart={cart} customer={customer} />
    </div>
  );
}
