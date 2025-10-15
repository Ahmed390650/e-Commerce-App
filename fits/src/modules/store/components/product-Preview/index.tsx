"use client";
import {
  OrginalPriceForSale,
  ProductCheapestPrice,
  ProductSavingPercent,
  ProductTitle,
  useProduct,
} from "@/components/product";
import ImageWithButtons from "./ImageWithButtons";

const ProductPreview = () => {
  const { product } = useProduct();
  return (
    <div className="flex flex-col relative overflow-hidden ">
      <div className="w-full  ">
        <div className="h-[400px]">
          <ImageWithButtons product={product} />
        </div>
      </div>
      <div className="flex flex-col  px-2">
        <ProductTitle className="text-[10px]   first-letter:uppercase max-w-full  truncate leading-3.5 text-[#393741]" />
        <div className="row flex justify-between items-center">
          <ProductCheapestPrice />
          <div className="max-w-[50%] grow-0 shrink-0">
            <ProductSavingPercent />
          </div>
        </div>
        <div className="row justify-between min-h-[20px]">
          <OrginalPriceForSale />
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
