import { createCheckoutSession } from "@/lib/data/payment";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const usePaymentCheckout = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (url) => {
      router.push(url);
    },
    onError(e) {
      toast.error(e.message);
    },
  });
  return {
    checkout: React.useCallback(mutate, [mutate]),
    isPending,
  };
};

export default usePaymentCheckout;
