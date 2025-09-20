import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn(...args) -> string
 * Accepts the same inputs as clsx (strings, arrays, objects) and returns a
 * single className string with Tailwind class collisions resolved by twMerge.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
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

export default cn;
