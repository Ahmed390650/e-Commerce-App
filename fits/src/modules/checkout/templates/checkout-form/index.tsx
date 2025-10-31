import { listCartShippingMethods } from "@/lib/data/fulfillment";
import { listCartPaymentMethods } from "@/lib/data/payment";
import { listRegions } from "@/lib/data/regions";
import { HttpTypes } from "@medusajs/types";
import Addresses from "../../components/addresses";
import CheckoutPaymentStep from "../../components/payment";
import Shipping from "../../components/shipping";

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

  const region = await listRegions();
  if (!shippingMethods || !paymentMethods) {
    return null;
  }
  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} region={region[0]} />
      <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      <CheckoutPaymentStep cart={cart} />
    </div>
  );
}
