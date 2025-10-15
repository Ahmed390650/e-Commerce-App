import {
  OrginalPriceForSale,
  ProductCheapestPrice,
  ProductProvider,
  ProductSavingPercent,
  ProductTitle,
} from "@/components/product";
import { retrieveCart } from "@/lib/data/cart";
import { listProducts } from "@/lib/data/products";
import { getRegion } from "@/lib/data/regions";
import ImageWithButtons from "@/modules/store/components/product-Preview/ImageWithButtons";
import { HttpTypes } from "@medusajs/types";

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct;
  countryCode: string;
};

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode);
  const cart = await retrieveCart().catch(() => null);
  if (!region) {
    return null;
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductParams = {};
  if (region?.id) {
    queryParams.region_id = region.id;
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id];
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[];
  }
  queryParams.is_giftcard = false;

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    );
  });

  if (!products.length) {
    return null;
  }

  return (
    <div className="flex justify-start flex-col gap-1">
      <div className="flex text-center justify-start mt-5">
        <span className="font-semibold  mb-5">Similar products</span>
      </div>
      <div className="flex  flex-col justify-start">
        <div className="flex flex-nowrap overflow-x-auto ">
          {products.map((product) => (
            <li
              key={product.id}
              className="w-fit inline-block overflow-hidden whitespace-nowrap mx-[10px] my-0 list-disc   align-middle"
            >
              <ProductProvider
                product={product}
                countryCode={countryCode}
                cart={cart}
              >
                <ImageWithButtons product={product} />
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
              </ProductProvider>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
