import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { listCartPaymentMethods } from "@/lib/data/payment";
import { initiatePaymentSession } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { useSearchParams } from "next/navigation";

type UseSetupPaymentSessionProps = {
  region_id: string;
  cart: HttpTypes.StoreCart;
  autoInitiate?: boolean;
};

/**
 * Single Hook: handles both provider fetching and payment session initiation
 */
export const useSetupPaymentSession = ({
  region_id,
  cart,
  autoInitiate = true,
}: UseSetupPaymentSessionProps) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "payment";

  // Step 1: Get payment providers
  const {
    data: paymentProviders,
    isLoading: isLoadingProviders,
    isError: providerError,
  } = useQuery({
    queryKey: ["payment_providers", region_id],
    queryFn: () => listCartPaymentMethods(region_id),
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  // Step 2: Initiate payment session — triggered only when needed
  const {
    data: paymentSession,
    isLoading: isInitiating,
    isError: sessionError,
    refetch: initiatePaymentSessionQuery,
  } = useQuery({
    queryKey: ["payment_session", cart.id],
    queryFn: async () => {
      if (!paymentProviders?.length) return null;
      const provider_id = paymentProviders[0].id;
      const res = await initiatePaymentSession({
        data: { provider_id },
        cart,
      });
      return res;
    },
    enabled: !!cart && !!paymentProviders && autoInitiate && isOpen, // only auto-run if ready
    retry: false,
  });

  // Step 3: Manual initiation helper (when autoInitiate = false)
  const initiateManually = async () => {
    if (!paymentProviders?.length) return;
    try {
      const res = await initiatePaymentSession({
        data: { provider_id: paymentProviders[0].id },
        cart,
      });
      toast.success("Payment session initiated manually ✅");
      return res;
    } catch (error) {
      toast.error("Manual initiation failed", {
        description: JSON.stringify(error, null, 2),
      });
    }
  };
  const clientSecret = cart?.payment_collection?.payment_sessions?.[0]?.data
    .client_secret as string;

  return {
    paymentProviders,
    paymentSession,
    clientSecret,
    isLoading: isLoadingProviders || isInitiating,
    isError: providerError || sessionError,
    isOpen,
    refetch: initiatePaymentSessionQuery, // call to re-initiate manually
    initiateManually,
  };
};
