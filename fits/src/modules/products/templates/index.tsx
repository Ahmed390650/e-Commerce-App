"use client";
import { ProductProvider } from "@/components/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HttpTypes } from "@medusajs/types";
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
  return (
    <div className=" flex flex-col w-full gap-5">
      <ProductProvider product={product} cart={cart} countryCode={countryCode}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div className="w-full">
            <ProductGallery images={product.images} />
          </div>

          <div className="w-full">
            <ProductInfo product={product} countryCode={countryCode} />
          </div>
        </div>
      </ProductProvider>
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
            {product.description}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductTemplates;
