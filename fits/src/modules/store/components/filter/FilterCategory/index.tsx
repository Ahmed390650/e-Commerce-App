import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useFilterButton from "../hooks/useFilterButton";
import Link from "next/link";

const FilterCategory = ({
  productCategoy,
}: {
  productCategoy?: { value: string; handle: string }[];
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {productCategoy && productCategoy.length > 0 && (
        <>
          <ButtonCategory>All</ButtonCategory>
          {productCategoy.map(({ handle, value }) => (
            <ButtonCategory key={value} asChild>
              <Link href={handle}>{value}</Link>
            </ButtonCategory>
          ))}
        </>
      )}
    </div>
  );
};
const ButtonCategory = ({ ...props }: React.ComponentProps<typeof Button>) => {
  const { toggleFilter, isActiveFilter } = useFilterButton();
  const isActive = isActiveFilter("category", props.children as string);

  return (
    <Button
      variant={isActive ? "default" : "secondary"}
      {...props}
      className="px-4 cursor-pointer"
      onClick={() => toggleFilter("category", props.children as string, true)}
    />
  );
};
export default FilterCategory;
