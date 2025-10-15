"use client";
import { SortOptions } from "@/modules/store/components/filter/select-filter";
import { useSearchParams } from "next/navigation";

export default function useParsedFilters() {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort");
  const filterParam = searchParams.get("filter") || "";

  return {
    sortBy: sortParam as SortOptions,
    filter: filterParam.split(";").reduce((acc, f) => {
      const [label, values = ""] = f.split(":");
      if (label) {
        acc[label.toLowerCase()] = values.split(",").filter(Boolean); // array نظيفة
      }
      return acc;
    }, {} as Record<string, string[]>),
  };
}
