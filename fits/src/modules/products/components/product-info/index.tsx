"use client";
import {
  AddButtonToCart,
  OptionsVariant,
  useProduct,
} from "@/components/product";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HttpTypes } from "@medusajs/types";
import OptionSelect from "../product-action/OptionsButton";
import PreviewPrice from "../product-Preview/PreviewPrice";
import { Loader2Icon } from "lucide-react";

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};
const ProductInfo = ({
  product,
  countryCode,
}: {
  product: HttpTypes.StoreProduct;
  countryCode: string;
}) => {
  const {
    setOptionValue,
    selectedVariant,
    options,
    cheapestPrice,
    variantPrice,
    isMutating,
  } = useProduct();

  // update the options when a variant is selected

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-[20px]">{product.title}</h1>

      <PreviewPrice
        price={selectedVariant?.id ? variantPrice : cheapestPrice}
      />
      <div className="text-[10px] font-light flex items-center">
        <span className="text-[10px] font-light">
          Prices are inclusive of VAT
        </span>
      </div>
      <div>
        <Badge
          variant="outline"
          className="uppercase p-2 border-green-500 text-green-500 "
        >
          free shipping
        </Badge>
      </div>
      <Separator />
      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-y-4 my-5">
          {(product.options || []).map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={setOptionValue}
                  title={option.title ?? ""}
                  data-testid="product-options"
                />
              </div>
            );
          })}
        </div>
      )}
      <Separator />
      <OptionsVariant />
      <AddButtonToCart className="rounded-none cursor-pointer">
        <span className="first-letter:uppercase">
          {!isMutating ? (
            "add to Cart"
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </span>
      </AddButtonToCart>
    </div>
  );
};

export default ProductInfo;
