import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { addToCart } from "../data/cart";

const useAddCart = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product Add to Cart");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return {
    addToCart: useCallback(mutate, [mutate]),
    isAdding: isPending,
  };
};

export default useAddCart;
