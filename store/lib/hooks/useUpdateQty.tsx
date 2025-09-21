import { useMutation } from "@tanstack/react-query";
import React from "react";
import { updateLineItem } from "../data/cart";
import { toast } from "sonner";

const useUpdateQty = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateLineItem,
    onSuccess: () => {
      toast.success("Cart updated quantity", { id: "cart-update" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cart-update" });
    },
  });
  return {
    updateMutate: mutate,
    isUpdating: isPending,
  };
};

export default useUpdateQty;
