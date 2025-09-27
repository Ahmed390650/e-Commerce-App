"use client";
import { ProductProvider } from "@/components/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CartPopover from "@/modules/layout/components/cart-dialog";
import { HttpTypes } from "@medusajs/types";
import { useState } from "react";
import ProductGallery from "../components/product-gallery/";
import ProductInfo from "../components/product-info";
import { ProductInfoTab } from "../components/product-tabs";
const ProductTemplates = ({
  product,
  cart,
  countryCode,
}: {
  product: HttpTypes.StoreProduct;
  cart: HttpTypes.StoreCart | null;
  countryCode: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" flex flex-col w-full gap-5">
      <ProductProvider
        product={product}
        cart={cart}
        countryCode={countryCode}
        setIsOpen={setIsOpen}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div className="w-full">
            <ProductGallery images={product.images} />
          </div>

          <div className="w-full">
            <ProductInfo product={product} countryCode={countryCode} />
          </div>
        </div>
      </ProductProvider>
      <CartPopover cart={cart} isOpen={isOpen} setIsOpen={setIsOpen} />
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
