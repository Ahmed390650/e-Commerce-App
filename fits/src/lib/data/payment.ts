"use server";

import { HttpTypes } from "@medusajs/types";
import { sdk } from "../sdk";
import stripe from "../stripe";
import medusaError from "../utils/medusa-error";
import { getAuthHeaders, getCacheOptions } from "./cookies";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export const createCheckoutSession = async ({
  cart,
  metadata,
}: {
  cart: HttpTypes.StoreCart;
  metadata: Metadata;
}) => {
  try {
    // Initialize payment session

    await sdk.store.payment.initiatePaymentSession(cart, {
      provider_id: "pp_stripe_stripe", // e.g., "pp_stripe_stripe"
    });
    const items = cart.items || [];
    const itemsWithoutPrice = items.filter((item) => !item.unit_price);
    if (!itemsWithoutPrice) throw new Error("Some item dont have price");
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }
    const baseURL =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;
    const success_url = `${baseURL}/checkout?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancel_url = `${baseURL}/checkout`;
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      success_url,
      cancel_url,
      line_items: items.map((item) => ({
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(item.unit_price! * 100),
          product_data: {
            name: item.product?.title || "Unnamed product",
            description: `Product ID: ${item.product?.id}`,
            metadata: {
              id: item.product?.id ?? "", // Provide a value for the 'id' property
            },
            images: item.product?.thumbnail ? [item.product?.thumbnail] : [], // Ensure images is an array
          },
        },
        quantity: item.quantity,
      })),
    });
    if (!session.url) throw new Error("No session url");
    return session.url;
  } catch {
    throw new Error("Error creating checkout");
  }
};
export const listCartPaymentMethods = async (regionId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("payment_providers")),
  };

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        method: "GET",
        query: { region_id: regionId },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ payment_providers }) =>
      payment_providers.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      })
    )
    .catch((error) => {
      throw medusaError(error);
    });
};
