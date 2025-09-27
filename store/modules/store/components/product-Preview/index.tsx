"use client";
import {
  AddToCartButton,
  OrginalPriceForSale,
  ProductCheapestPrice,
  ProductDescription,
  ProductImageThumbnail,
  ProductProvider,
  ProductSavingPercent,
  ProductTitle,
} from "@/components/product";
import { HttpTypes } from "@medusajs/types";
import { Star } from "lucide-react";
import Link from "next/link";

const ProductPreview = ({
  item,
  countryCode,
  cart,
  setIsOpen,
}: {
  item: HttpTypes.StoreProduct;
  countryCode: string;
  cart: HttpTypes.StoreCart | null;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className=" h-full bg-[#f9f9f9] px-[20px] py-[14px]   cursor-pointer relative overflow-hidden">
      <ProductProvider
        product={item}
        countryCode={countryCode}
        cart={cart}
        setIsOpen={setIsOpen}
      >
        <div>
          <Link href={`/products/${item.handle}`} className="block">
            <div className="row">
              <div className="w-full flex items-center justify-center ">
                <div className="w-[160px] opacity-60 hover:opacity-100 transition hover:scale-110 duration-300 ">
                  <ProductImageThumbnail />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="flex justify-between mt-[35px] max-w-full w-full">
                <ProductTitle className="text-[14px] font-bold text-[#000000] uppercase" />
                <div className="flex justify-end w-[18%] ">
                  <span className="text-[14px] font-bold tracking-[0.3px] h-[14px]">
                    4.8
                  </span>
                  <Star
                    className="stroke-amber-300 fill-amber-300 text-center"
                    size={15}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="max-w-full grow-0 shrink-0 ">
                <ProductDescription className="mt-[5px] text-[12px] font-medium text-[#7d7d7d] whitespace-nowrap truncate max-w-[15rem]" />
              </div>
            </div>
            <div className="row flex justify-between items-center">
              <ProductCheapestPrice />
              <div className="max-w-[50%] grow-0 shrink-0">
                <ProductSavingPercent />
              </div>
            </div>
            <div className="row justify-between min-h-[20px]">
              <OrginalPriceForSale />
            </div>
          </Link>
        </div>
        <div className="row">
          <div className="basis-full max-w-full shrink-0  grow-0">
            <div className="my-[16px] mx-0">
              <AddToCartButton />
            </div>
          </div>
        </div>
      </ProductProvider>
    </div>
  );
};

export default ProductPreview;
