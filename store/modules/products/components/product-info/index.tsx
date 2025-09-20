"use client";
import { Badge } from "@/components/ui/badge";
import { getProductPrice } from "@/lib/utils/get-product-price";
import { HttpTypes } from "@medusajs/types";
import ActionButton from "../product-action";
import PreviewPrice from "../product-Preview/PreviewPrice";
import { Separator } from "@/components/ui/separator";
import OptionSelect from "../product-action/OptionsButton";
import * as React from "react";
import { isEqual } from "@/lib/utils";

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};
const ProductInfo = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const [options, setOptions] = React.useState<
    Record<string, string | undefined>
  >({});
  const selectedVariant = React.useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return;
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);
  const { variantPrice, cheapestPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  });
  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };
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
      <ActionButton variantId={selectedVariant?.id} />
    </div>
  );
};

export default ProductInfo;
