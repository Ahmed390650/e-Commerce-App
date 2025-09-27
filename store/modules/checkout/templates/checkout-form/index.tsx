import { HttpTypes } from "@medusajs/types";
import Addresses from "../../components/addresses";
import { listCartShippingMethods } from "@/lib/data/fulfillment";
import { listCartPaymentMethods } from "@/lib/data/payment";

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) {
  if (!cart) {
    return null;
  }

  const shippingMethods = await listCartShippingMethods(cart.id);
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "");

  if (!shippingMethods || !paymentMethods) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />
    </div>
  );
}
