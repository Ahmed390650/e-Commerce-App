import cn from "@/lib/utils";
import React from "react";

const ProductPrice = ({
  value,
  hasSaleType,
}: {
  value: string | number | undefined;
  hasSaleType: boolean;
}) => {
  return (
    <div className="max-w-[50%] shrink-0  grow-0 ">
      <div
        className={cn(
          "text-[16px] font-bold my-[10px]",
          hasSaleType ? "text-[#ff0000]" : "text-[#000000]"
        )}
      >
        <span
          className={cn(
            `text-[16px] font-bold `,
            hasSaleType ? "text-[#ff0000]" : "text-[#000000]"
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default ProductPrice;
