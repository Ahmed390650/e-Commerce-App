"use client";
import useAddCart from "@/components/product/hooks/useAddCart";
import useDeleteLineItemCart from "@/components/product/hooks/useDeleteLine";
import useUpdateQty from "@/components/product/hooks/useUpdateQty";
import cn, { isEqual, optionsAsKeymap } from "@/lib/utils";
import { getProductPrice } from "@/lib/utils/get-product-price";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import ProductPrice from "./product-Price";
import { VariantProps } from "class-variance-authority";

type ProductProviderValueProps = {
  product: HttpTypes.StoreProduct;
  cheapestPrice: ReturnType<typeof getProductPrice>["cheapestPrice"];
  handleAdd: () => void;
  countryCode?: string;
  isMutating: boolean;
  cart?: HttpTypes.StoreCart | null;
  variantPrice?: ReturnType<typeof getProductPrice>["variantPrice"];
  changeQuantity: (quantity: number, lineId: string) => void;
  handleDelete: (id: string) => void;
  selectedVariant: HttpTypes.StoreProductVariant | undefined;
  setOptionValue: (optionId: string, value: string) => void;
  options: Record<string, string | undefined>;
};
const ProductContextValue =
  React.createContext<ProductProviderValueProps | null>(null);

const useProduct = () => {
  const context = React.useContext(ProductContextValue);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

type ProductProviderProps = {
  children: React.ReactNode;
  product: HttpTypes.StoreProduct;
  countryCode?: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  cart?: HttpTypes.StoreCart | null;
  variantId?: string;
};
const ProductProvider = ({
  children,
  product,
  countryCode,
  cart,
  setIsOpen,
  variantId,
}: ProductProviderProps) => {
  const [options, setOptions] = React.useState<
    Record<string, string | undefined>
  >({});
  const { addToCart, isAdding } = useAddCart();
  const { isUpdating, updateMutate } = useUpdateQty();

  const selectedVariant = React.useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return;
    }
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: selectedVariant ? selectedVariant.id : variantId,
  });
  const handleAdd = () => {
    if (!countryCode) return;
    addToCart(
      {
        countryCode,
        quantity: 1,
        variantId: variantPrice
          ? variantPrice.variantId
          : cheapestPrice?.variantId,
      },
      {
        onSuccess: () => {
          setIsOpen?.(true);
        },
      }
    );
  };

  const changeQuantity = (quantity: number, lineId: string) => {
    updateMutate({
      lineId,
      quantity,
    });
  };
  const { Mutatedelete, isDeleteing } = useDeleteLineItemCart();
  const handleDelete = (id: string) => {
    Mutatedelete(id);
  };
  const isMutating = isDeleteing || isUpdating || isAdding;

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };
  if (!product) {
    return null;
  }
  return (
    <ProductContextValue.Provider
      value={{
        options,
        product,
        cheapestPrice,
        handleAdd,
        isMutating,
        selectedVariant,
        countryCode,
        cart,
        variantPrice,
        changeQuantity,
        handleDelete,
        setOptionValue,
      }}
    >
      {children}
    </ProductContextValue.Provider>
  );
};
type ProductClassName = {
  className?: string;
};
const ProductImageThumbnail = ({ className }: ProductClassName) => {
  const { product } = useProduct();
  if (!product.thumbnail) return null;
  return (
    <div className="relative aspect-square inset-0 w-full h-full ">
      <Image
        src={product.thumbnail}
        alt={product.title}
        fill
        className={cn(className, "absolute object-cover")}
      />
    </div>
  );
};

const ProductTitle = ({ className }: ProductClassName) => {
  const { product } = useProduct();
  return (
    <span
      title={product.title}
      className={cn(
        `w-full truncate font-normal text-[12px] text-[#25282b] max-w-[100px]`,
        className
      )}
    >
      {product.title}
    </span>
  );
};
const ProductDescription = ({ className }: ProductClassName) => {
  const { product } = useProduct();
  return (
    <div
      title={product.description ?? ""}
      className={cn(
        `w-full truncate font-normal  text-[12px] text-[#25282b]`,
        className
      )}
    >
      {product.description}
    </div>
  );
};
const ProductCheapestPrice = () => {
  const { cheapestPrice } = useProduct();

  const hasSaleType = cheapestPrice?.price_type === "sale";

  return (
    <ProductPrice
      hasSaleType={hasSaleType}
      value={cheapestPrice?.calculated_price}
    />
  );
};

const OrginalPriceForSale = () => {
  const { cheapestPrice } = useProduct();
  const hasSaleType = cheapestPrice?.price_type === "sale";

  return (
    <div className="text-[12px] font-medium text-[#3d3d3d] line-through">
      {hasSaleType ? cheapestPrice?.original_price : ""}
    </div>
  );
};
const SavingPrice = () => {
  const { cheapestPrice } = useProduct();

  const hasSaleType = cheapestPrice?.price_type === "sale";

  return (
    <div className="text-end max-w-2/3 basis-2/3 grow-0 shrink-0">
      <div className="text-[12px] font-bold text-[#1d1d1d]">
        {hasSaleType ? `${cheapestPrice.saving_price} حفظ` : ""}
      </div>
    </div>
  );
};
const ProductSavingPercent = ({
  className,
  asChild,
}: ProductClassName & { asChild?: boolean }) => {
  const { cheapestPrice } = useProduct();
  if (cheapestPrice?.price_type !== "sale") {
    return null;
  }
  return (
    <div className="float-left bg-[#a8efb4] p-[4px] flex justify-center items-center w-fit">
      <div
        className={cn(
          "flex items-center text-[12px] font-bold cursor-pointer  text-[#1d1d1d] ltr",
          className
        )}
      >{`-${cheapestPrice.percentage_diff} %`}</div>
    </div>
  );
};
const SavingNumber = () => {
  const { cheapestPrice } = useProduct();
  if (cheapestPrice?.price_type !== "sale") {
    return null;
  }
  return (
    <span className="text-[12px] font-semibold ">
      {cheapestPrice?.saving_price} توفير
    </span>
  );
};
const AddButtonToCart = ({
  className,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) => {
  const { handleAdd, isMutating } = useProduct();

  return (
    <Button
      className={cn("", className)}
      {...props}
      onClick={handleAdd}
      disabled={isMutating}
      aria-disabled={isMutating}
    />
  );
};
const OptionsVariant = () => {
  const { product } = useProduct();

  const options = product.options;
  const variants = product.variants;

  return <div></div>;
};
export {
  AddButtonToCart,
  OptionsVariant,
  OrginalPriceForSale,
  ProductCheapestPrice,
  ProductDescription,
  ProductImageThumbnail,
  ProductProvider,
  ProductSavingPercent,
  ProductTitle,
  SavingNumber,
  SavingPrice,
  useProduct,
};
