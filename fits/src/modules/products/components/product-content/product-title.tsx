import React from "react";

const ProductTitle = ({ title }: { title?: string }) => {
  return (
    <div className="text-[14px] font-semibold font-stretch-normal  truncate">
      <span className="text-[14px] font-semibold font-stretch-normal  truncate">
        {title}
      </span>
    </div>
  );
};

export default ProductTitle;
