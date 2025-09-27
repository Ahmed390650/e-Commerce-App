"use client";
import ProductCardSkeleton from "@/modules/skelekons/skelekon-ProductList";
import { HttpTypes } from "@medusajs/types";
import * as React from "react";
import useInfiniteProductsList from "../../hooks/useInfiniteProductsList";
import ProductPreview from "../product-Preview";
import CartPopover from "@/components/cart/Cart-Popover";
const ProductPaginationList = ({
  countryCode,
  cart,
}: {
  countryCode: string;
  cart: HttpTypes.StoreCart | null;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data, loaderRef, isLoading } = useInfiniteProductsList({
    countryCode,
  });
  const allProducts =
    data?.pages.flatMap((page) => page.response.products) || [];
  if (isLoading) {
    return <ProductCardSkeleton />;
  }
  return (
    <>
      <ol className="m-0 p-0 grid gap-3 grid-cols-1  md:grid-cols-3 sm:grid-cols-2 ">
        {allProducts.map((item) => (
          <ProductPreview
            item={item}
            key={item.id}
            countryCode={countryCode}
            cart={cart}
            setIsOpen={setIsOpen}
          />
        ))}
      </ol>
      <CartPopover cart={cart} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        ref={loaderRef}
        className="h-10 flex items-center justify-center"
      ></div>
    </>
  );
};

export default ProductPaginationList;
