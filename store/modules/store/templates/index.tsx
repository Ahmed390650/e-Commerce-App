import { listProducts } from "@/lib/data/products";
import ProductPreview from "@/modules/products/components/product-Preview";
import React from "react";

const StoreTempalte = async ({ countryCode }: { countryCode: string }) => {
  const {
    response: { products },
  } = await listProducts({ countryCode });
  return (
    <ul className="grid grid-cols-1 gap-2 lg:grid-cols-5 mt-5  sm:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductPreview product={product} />
        </li>
      ))}
    </ul>
  );
};

export default StoreTempalte;
