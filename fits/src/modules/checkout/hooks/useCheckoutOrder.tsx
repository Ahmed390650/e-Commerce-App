import { placeOrder } from "@/lib/data/cart";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const useCheckoutOrder = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: placeOrder,
    onSuccess() {
      toast.success("Order Placed");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return {
    checkout: React.useCallback(mutate, [mutate]),
    isPending,
  };
};

export default useCheckoutOrder;
