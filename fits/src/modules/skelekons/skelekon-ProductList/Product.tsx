import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductSkelekon = () => {
  return (
    <div className="h-[400px] bg-gray-200 px-[20px] py-[16px] mb-[16px] relative overflow-hidden">
      <div className="flex items-center justify-center">
        <Skeleton className="w-[160px] h-[160px] rounded-md" />
      </div>
      <div className="mt-6 space-y-2">
        <Skeleton className="h-4 w-3/4" /> {/* title */}
        <Skeleton className="h-3 w-1/2" /> {/* description */}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Skeleton className="h-5 w-16" /> {/* cheapest price */}
        <Skeleton className="h-5 w-12" /> {/* saving percent */}
      </div>
      <div className="mt-2">
        <Skeleton className="h-4 w-20" /> {/* original price */}
      </div>
      <div className="mt-4">
        <Skeleton className="h-9 w-full rounded-md" /> {/* button */}
      </div>
    </div>
  );
};

export default ProductSkelekon;
