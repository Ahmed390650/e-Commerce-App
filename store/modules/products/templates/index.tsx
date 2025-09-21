import { HttpTypes } from "@medusajs/types";
import React from "react";
import ImageGallery from "../components/product-gallery";
import ProductInfo from "../components/product-info";
import CartPopover from "@/modules/layout/components/cart-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductInfoTab } from "../components/product-tabs";
const ProductTemplates = async ({
  product,
  cart,
  countryCode,
}: {
  product: HttpTypes.StoreProduct;
  cart: HttpTypes.StoreCart | null;
  countryCode: string;
}) => {
  return (
    <div className=" flex flex-col w-full gap-5">
      <div className="flex grow-0 shrink basis-auto flex-wrap">
        <div className="w-full p-0 grow-0 shrink-0 basis-[58.33333333%] max-w-[58.33333333%]">
          <div className="relative">
            <div>
              <div className="h-full w-full">
                <div className="container">
                  <div className="w-full flex flex-wrap box-border">
                    <ImageGallery images={product.images} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-0 grow-0 shrink-0  basis-[33.33333333%] max-w-[33.33333333%]">
          <ProductInfo product={product} countryCode={countryCode} />
          <CartPopover cart={cart} />
        </div>
      </div>
      <div className="w-full ">
        <Tabs defaultValue="Information" className="w-full ">
          <TabsList className="w-full">
            <TabsTrigger value="Information" className="w-[50px]">
              Information
            </TabsTrigger>
            <TabsTrigger value="Description">Description</TabsTrigger>
          </TabsList>
          <TabsContent value="Information" className="border p-4">
            <ProductInfoTab product={product} />
          </TabsContent>
          <TabsContent value="Description" className="border p-4">
            Wake up to a flawless, natural coverage! This oil-free concealer
            formula matches skin tones to deliver a more even complexion
            unrevealing the redness, flaws, and blemishes. The Non-comedogenic
            product features different Shades of concealers to suit various skin
            tones without hiding the skins natural radiance Tips and tricks: Use
            a highlighter of two shades lighter than the foundation shade in
            order to lift the face and light it. Why you will love it? This
            oil-free concealer formula matches skin tones to deliver a more even
            complexion unrevealing the redness, flaws, and blemishes. About the
            brand: The Maybelline brand was founded in New York City in 1915. It
            is regarded as the leading global cosmetics brand with many branches
            in 129 countries worldwide. Maybelline consolidates technologically
            advanced formulas with on-trend expertise resulting in 200 different
            products. This multinational company offers a wide range of products
            of cosmetics skincare, fragrance, and personal care.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductTemplates;
