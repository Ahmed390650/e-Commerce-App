import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import React from "react";
import PreviewPrice from "./PreviewPrice";
import { getProductPrice } from "@/lib/utils/get-product-price";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProductInfoProps = {
  product: HttpTypes.StoreProduct;
};

const ProductPreview = async ({ product }: ProductInfoProps) => {
  const { cheapestPrice } = getProductPrice({ product });

  return (
    <Card className="bg-[#f9f9f9] py-4 px-5 mb-4 cursor-pointer relative rounded-none shadow-none border-none h-[400px] flex flex-col gap-2">
      <CardContent className="p-0 flex-1  ">
        <Link
          href={`/products/${product.handle}`}
          className="flex flex-col h-full"
        >
          {/* صورة المنتج */}
          <div className="w-full basis-[90%] relative aspect-auto mb-5 flex items-center justify-center">
            <Image
              className="object-cover absolute aspect-square"
              src={product?.thumbnail!}
              alt={product.title}
              width={200}
              height={200}
            />
          </div>

          {/* النصوص + السعر */}
          <div className="flex flex-col  flex-1">
            <div className="font-bold text-sm truncate">{product.title}</div>
            <div
              title={product.description!}
              className="font-medium text-xs text-muted-foreground mt-1.5  w-full truncate"
            >
              {product.description}
            </div>
            {cheapestPrice && (
              <div className="mt-2">
                <PreviewPrice price={cheapestPrice} />
              </div>
            )}
          </div>
        </Link>
      </CardContent>

      {/* زرار الإضافة */}
      <CardFooter className="p-0">
        <CardAction className="w-full">
          <Button
            variant="outline"
            className="w-full rounded-sm text-[16px] font-bold"
          >
            + اضف
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default ProductPreview;
