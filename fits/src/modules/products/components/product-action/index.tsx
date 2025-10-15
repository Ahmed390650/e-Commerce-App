import { Button } from "@/components/ui/button";
import useAddCart from "@/components/product/hooks/useAddCart";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const ActionButton = ({
  variantId,
  countryCode,
}: {
  variantId?: string;
  countryCode: string;
}) => {
  const { addToCart, isAdding } = useAddCart();
  const handleAddToCart = () => {
    if (!variantId) {
      toast.error("Variant id missing", { id: "add-to-cart" });
      return;
    }

    addToCart({
      variantId: variantId,
      quantity: 1,
      countryCode,
    });
  };
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      disabled={isAdding}
      className="uppercase rounded-sm"
      onClick={handleAddToCart}
    >
      {isAdding ? <Loader2Icon className="animate-spin" /> : "add to cart"}
    </Button>
  );
};

export default ActionButton;
