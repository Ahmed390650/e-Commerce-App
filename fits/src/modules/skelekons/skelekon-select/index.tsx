import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FilterAccordionSkeletonSelect = () => {
  return (
    <div className="flex justify-between">
      {/* Option Filters */}
      <Skeleton className="h-10 w-32 py-2 px-3" />
    </div>
  );
};

export default FilterAccordionSkeletonSelect;
