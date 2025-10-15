"use client";
import CartPopover from "@/components/cart/Cart-Popover";
import { ProductProvider } from "@/components/product";
import { Skeleton } from "@/components/ui/skeleton";
import { listProducts } from "@/lib/data/products";
import ProductSkelekon from "@/modules/skelekons/skelekon-ProductList/Product";
import ProductCardSkeletonList from "@/modules/skelekons/skelekon-ProductList/ProductList";
import { HttpTypes } from "@medusajs/types";
import * as React from "react";
import useInfiniteProductsList from "../../hooks/useInfiniteProductsList";
import { BreadcrumbProducts } from "../breadcrumb";
import {
  FilterButton,
  FilterProvider,
  SelectedFilterList,
} from "../filter/fiter-list";
import SelectSort from "../filter/select-filter";
import ProductPreview from "../product-Preview";
import { extractProductFilters, extractUniqueOptions } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import FilterSheet from "../filter/FilterSheet";
const ProductPaginationList = ({
  countryCode,
  cart,
  initialData,
  queryParams,
}: {
  countryCode: string;
  cart: HttpTypes.StoreCart | null;
  initialData?: Awaited<ReturnType<typeof listProducts>>;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const query = useInfiniteProductsList({
    countryCode,
    initialData,
    queryParams,
  });
  const { data, loaderRef, isLoading, isFetchingNextPage } = query;
  const allProducts =
    data?.pages.flatMap((page) => page.response.products) || [];
  const type = extractProductFilters(allProducts, "type", (i) => i.type?.value);
  const options = extractUniqueOptions(allProducts);
  return (
    <div className="grid lg:grid-cols-[200px_1fr] gap-4 grid-cols-1">
      <div className="md:block hidden">
        <FilterProvider>
          {options.map(({ title, values }) => (
            <FilterButton
              key={title}
              valueItem={title}
              items={values.map(({ value, count }) => ({ value, count }))}
            />
          ))}
          {type.values.length > 0 && (
            <FilterButton valueItem="type" items={type.values} />
          )}
        </FilterProvider>
      </div>
      <div className="flex flex-col gap-2">
        <BreadcrumbProducts />
        <div className="mt-5">
          <SelectedFilterList />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-accent-foreground font-semibold flex gap-2">
            {isLoading ? (
              <Skeleton className="p-2 rounded-xs" />
            ) : (
              allProducts.length
            )}{" "}
            Item Count
          </span>
          <div className="md:hidden  ">
            <FilterSheet>
              <FilterProvider>
                {options.map(({ title, values }) => (
                  <FilterButton
                    key={title}
                    valueItem={title}
                    items={values.map(({ value, count }) => ({ value, count }))}
                  />
                ))}
                {type.values.length > 0 && (
                  <FilterButton valueItem="type" items={type.values} />
                )}
              </FilterProvider>
            </FilterSheet>
          </div>
          <SelectSort />
        </div>
        {isLoading ? (
          <ProductCardSkeletonList />
        ) : (
          <ol className="m-0 p-0 grid gap-1 grid-cols-1  md:grid-cols-4 sm:grid-cols-2">
            {allProducts.map((item) => (
              <ProductProvider
                product={item}
                countryCode={countryCode}
                cart={cart}
                setIsOpen={setIsOpen}
                key={item.id}
              >
                <ProductPreview />
              </ProductProvider>
            ))}
            {isFetchingNextPage && (
              <>
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductSkelekon key={index} />
                ))}
              </>
            )}
          </ol>
        )}
        <CartPopover cart={cart} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          ref={loaderRef}
          className="h-10 flex items-center justify-center"
        />
      </div>
    </div>
  );
};

export default ProductPaginationList;
