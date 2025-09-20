import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/data/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ActionButton = ({ variantId }: { variantId?: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Product Add to Cart", { id: "add-to-cart" });
    },
    onError(error) {
      toast.error(error.message, { id: "add-to-cart" });
    },
  });
  const handleAddToCart = () => {
    if (!variantId) return null;

    mutate({
      variantId: variantId,
      quantity: 1,
      countryCode: "eg",
    });
  };
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      disabled={isPending}
      className="uppercase rounded-sm"
      onClick={handleAddToCart}
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : "add to cart"}
    </Button>
  );
};

export default ActionButton;
