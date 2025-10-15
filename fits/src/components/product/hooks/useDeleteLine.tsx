import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { deleteLineItem } from "../../../lib/data/cart";

const useDeleteLineItemCart = () => {
  const { mutate: Mutatedelete, isPending: isDeleteing } = useMutation({
    mutationFn: deleteLineItem,
    onSuccess: () => {
      toast.success("Item removed from cart", { id: "cart-remove" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cart-remove" });
    },
  });
  return {
    Mutatedelete: useCallback(Mutatedelete, [Mutatedelete]),
    isDeleteing,
  };
};

export default useDeleteLineItemCart;
