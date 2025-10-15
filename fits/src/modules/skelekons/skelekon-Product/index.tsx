import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      {/* Left side - Gallery */}
      <div className="w-full flex flex-col items-center gap-3">
        {/* Main image */}
        <Skeleton className="w-full max-w-lg aspect-square rounded-sm" />

        {/* DotsNavigation / thumbnails */}
        <div className="flex gap-2 justify-center">
          <Skeleton className="h-16 w-16 rounded-sm" />
          <Skeleton className="h-16 w-16 rounded-sm" />
          <Skeleton className="h-16 w-16 rounded-sm" />
        </div>
      </div>

      {/* Right side - ProductInfo */}
      <div className="w-full">
        <div className="flex flex-col gap-2">
          {/* Title */}
          <Skeleton className="h-7 w-3/4" />

          {/* Price */}
          <Skeleton className="h-6 w-24" />

          {/* VAT text */}
          <Skeleton className="h-3 w-40" />

          {/* Badge */}
          <Skeleton className="h-6 w-24 rounded-md" />

          <Skeleton className="h-[1px] w-full my-2" />

          {/* Options (simulate 2 select fields) */}
          <div className="flex flex-col gap-y-4 my-5">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <Skeleton className="h-[1px] w-full my-2" />

          {/* OptionsVariant */}
          <Skeleton className="h-8 w-32 rounded-md" />

          {/* Add to Cart Button */}
          <Skeleton className="h-10 w-full rounded-md mt-3" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
