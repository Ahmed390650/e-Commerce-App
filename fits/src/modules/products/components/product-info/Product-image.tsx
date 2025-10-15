import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import React from "react";

const ProductImage = ({ product }: { product?: HttpTypes.StoreProduct }) => {
  if (!product) {
    return null;
  }
  return (
    <div className="flex  items-center justify-self-center size-[84px] cursor-pointer relative">
      <Image
        fill
        src={product.thumbnail ?? ""}
        alt={product.handle}
        className="block m-auto max-w-full max-h-full absolute"
      />
    </div>
  );
};

export default ProductImage;
