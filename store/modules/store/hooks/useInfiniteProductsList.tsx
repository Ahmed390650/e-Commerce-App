"use client";
import { listProducts } from "@/lib/data/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
  order?: string;
};
const useInfiniteProductsList = ({ countryCode }: { countryCode: string }) => {
  const queryParams: PaginatedProductsParams = {
    limit: 10,
  };
  const query = useInfiniteQuery({
    queryKey: ["products", countryCode],
    queryFn: ({ pageParam = 1 }) =>
      listProducts({
        countryCode,
        pageParam,
        queryParams,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return {
    ...query,
    loaderRef,
  };
};

export default useInfiniteProductsList;
