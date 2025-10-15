"use server";

import { sdk } from "@/lib/sdk";
import { HttpTypes } from "@medusajs/types";
import { getRegion, retrieveRegion } from "./regions";
import { LIMITNUMBER } from "../constants";
import { sortProducts } from "../utils/sort-products";
import { SortOptions } from "@/modules/store/components/filter/select-filter";

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams & any;
  countryCode?: string;
  regionId?: string;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required");
  }

  const limit = queryParams?.limit || LIMITNUMBER;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  let region: HttpTypes.StoreRegion | undefined | null;
  if (countryCode) {
    region = await getRegion(countryCode);
  } else {
    region = await retrieveRegion(regionId!);
  }
  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }
  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          order: "-variants",
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
          ...queryParams,
        },
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null;

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      };
    });
};
/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  queryParams,
  sortBy = "created_at",
  countryCode,
  pageParam = 1,
}: {
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  sortBy?: SortOptions;
  countryCode: string;
  pageParam?: number;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
  const limit = queryParams?.limit || LIMITNUMBER;

  const {
    response: { products, count },
    nextPage,
  } = await listProducts({
    pageParam,
    queryParams: {
      ...queryParams,
      limit,
    },
    countryCode,
  });

  const sortedProducts = sortProducts(products, sortBy);

  return {
    response: {
      products: sortedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};
