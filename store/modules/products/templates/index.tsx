import { HttpTypes } from "@medusajs/types";
import React from "react";
import ImageGallery from "../components/product-gallery";
import ProductInfo from "../components/product-info";

const ProductTemplates = ({ product }: { product: HttpTypes.StoreProduct }) => {
  return (
    <div className="p-[100px] grid grid-cols-2    -mx-[8px] ">
      {/* Image column - 40% */}
      <div className="px-[8px]">
        <ImageGallery images={product.images} />
      </div>

      {/* Info column - 60% */}
      <div className="  px-[8px]">
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductTemplates;
