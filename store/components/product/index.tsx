"use client";
import useAddCart from "@/lib/hooks/useAddCart";
import cn, { isEqual } from "@/lib/utils";
import { getProductPrice } from "@/lib/utils/get-product-price";
import { HttpTypes } from "@medusajs/types";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import ProductPrice from "./product-Price";
import useUpdateQty from "@/lib/hooks/useUpdateQty";
import useDeleteLineItemCart from "@/lib/hooks/useDeleteLine";
const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};
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
  product?: HttpTypes.StoreProduct;
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

  if (!product) {
    return null;
  }
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
        variantId: cheapestPrice?.variantId,
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
    <div
      className={cn(
        `w-full truncate font-normal text-[12px] text-[#25282b]`,
        className
      )}
    >
      {product.title}
    </div>
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
  const { cheapestPrice, variantPrice } = useProduct();

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
    <>
      <div className="max-w-1/3 basis-1/3 grow-0 shrink-0 ">
        <div className="text-[12px] font-medium text-[#3d3d3d] line-through">
          {hasSaleType ? cheapestPrice?.original_price : ""}
        </div>
      </div>
      {
        <div className="text-end max-w-2/3 basis-2/3 grow-0 shrink-0">
          <div className="text-[12px] font-bold text-[#1d1d1d]">
            {hasSaleType ? `${cheapestPrice.saving_price} حفظ` : ""}
          </div>
        </div>
      }
    </>
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
const AddToCartButton = () => {
  const { handleAdd, isMutating, cart, product } = useProduct();
  if (!cart) {
    return null;
  }
  const isProductInCart = !!cart.items?.find(
    (i) => i.product?.id === product.id
  );
  return (
    <>
      {isProductInCart ? (
        <Button
          className="rounded-none w-full text-[12px] bg-[#76d671] text-white hover:bg-[#76d671]"
          asChild
        >
          <Link href={`/products/${product.handle}`}>{"تم اضافة المنتج"}</Link>
        </Button>
      ) : (
        <Button
          onClick={handleAdd}
          disabled={isMutating}
          className="rounded-none w-full text-[12px] cursor-pointer"
        >
          {isMutating ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              جاري الاضافة...
            </>
          ) : (
            "اضف الى السلة"
          )}
        </Button>
      )}
    </>
  );
};
const OptionsVariant = () => {
  const { product } = useProduct();

  const options = product.options;
  const variants = product.variants;

  return <div></div>;
};
export {
  AddToCartButton,
  OrginalPriceForSale,
  ProductCheapestPrice,
  ProductDescription,
  ProductImageThumbnail,
  ProductProvider,
  ProductSavingPercent,
  ProductTitle,
  SavingNumber,
  useProduct,
  OptionsVariant,
};
