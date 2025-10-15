import { HttpTypes, StoreProduct } from "@medusajs/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isEqual(obj1: any, obj2: any): boolean {
  // If both are the same reference
  if (obj1 === obj2) return true;

  // If either is null/undefined or not an object
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 == null ||
    obj2 == null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Length check
  if (keys1.length !== keys2.length) return false;

  // Compare each key/value
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
export const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};
type Extractor<T> = (item: T) => string | undefined | null;
type FilterValue = {
  value: string;
  count: number;
};
/**
 * Extracts all unique filter options (and their counts) from a product list.
 * @param values Array of items (like products)
 * @param title  The filter name (e.g., "brand", "category")
 * @param extractor Function to extract the value from each item
 */

type FilterResult = {
  title: string;
  values: FilterValue[];
};
export function extractProductFilters<T>(
  values: T[],
  title: string,
  extractor: Extractor<T>
): FilterResult {
  const valueCount: Record<string, number> = {};

  for (const v of values) {
    const value = extractor(v);
    if (!value) continue;
    valueCount[value] = (valueCount[value] || 0) + 1;
  }

  return {
    title,
    values: Object.entries(valueCount).map(([value, count]) => ({
      value,
      count,
    })),
  };
}

export function extractUniqueOptions(products: StoreProduct[]): FilterResult[] {
  const optionsMap: Record<string, Record<string, number>> = {};

  for (const product of products) {
    if (!product.options) continue;

    for (const option of product.options) {
      const title = option.title;
      if (!title || !option.values) continue;

      if (!optionsMap[title]) {
        optionsMap[title] = {};
      }

      for (const v of option.values as any) {
        const value = typeof v === "string" ? v : v?.value;
        if (!value) continue;

        optionsMap[title][value] = (optionsMap[title][value] || 0) + 1;
      }
    }
  }

  return Object.entries(optionsMap).map(([title, values]) => ({
    title,
    values: Object.entries(values).map(([value, count]) => ({
      value,
      count,
    })),
  }));
}
export default cn;
