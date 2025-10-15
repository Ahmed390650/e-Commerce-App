import React from "react";

const ProductDescription = ({
  description,
}: {
  description?: string | null;
}) => {
  if (!description) return null;
  return (
    <div
      className="w-[9.375rem] text-[12px] text-muted-foreground truncate"
      title={description}
    >
      {description}
    </div>
  );
};

export default ProductDescription;
