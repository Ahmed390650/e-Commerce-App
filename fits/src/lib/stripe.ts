import Stripe from "stripe";
if (!process.env.STRIPE_SECERT_KEY) {
  throw new Error("STRIPE_SECERT_KEY is not set");
}
const stripe = new Stripe(process.env.STRIPE_SECERT_KEY, {
  apiVersion: "2024-10-28.acacia",
});

export default stripe;
