import { retrieveCart } from "@/lib/data/cart";
import { getCategoryByHandle } from "@/lib/data/categories";
import { listProductsWithSort } from "@/lib/data/products";
import { extractProductFilters, extractUniqueOptions } from "@/lib/utils";

import ProductPaginationList from "@/modules/store/components/Product-List";
type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
  order?: string;
};
const CategoryTemplate = async ({
  category,
  countryCode,
}: {
  category?: string[];
  countryCode: string;
}) => {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  };

  const [cart, productCategory] = await Promise.all([
    retrieveCart(),
    getCategoryByHandle(category),
  ]);
  queryParams["category_id"] = [productCategory?.id];

  return (
    <ProductPaginationList
      cart={cart}
      countryCode={countryCode}
      queryParams={queryParams}
    />
  );
};

export default CategoryTemplate;
