import { useMutation } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { addToCart } from "../data/cart";
import { toast } from "sonner";

const useAddCart = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Product Add to Cart", { id: "add-to-cart" });
    },
    onError(error) {
      toast.error(error.message, { id: "add-to-cart" });
    },
  });
  return {
    addToCart: useCallback(mutate, []),
    isAdding: isPending,
  };
};

export default useAddCart;
