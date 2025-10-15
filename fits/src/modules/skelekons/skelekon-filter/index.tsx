import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FilterAccordionSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Option Filters */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="space-y-3">
          {/* Accordion Trigger (title) */}
          <Skeleton className="h-5 w-32" />

          {/* Accordion Content (checkbox + label) */}
          <div className="ml-4 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterAccordionSkeleton;
