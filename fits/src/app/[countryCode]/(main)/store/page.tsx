import FilterAccordionSkeleton from "@/modules/skelekons/skelekon-filter";
import ProductCardSkeleton from "@/modules/skelekons/skelekon-ProductList";
import StoreTemplate from "@/modules/store/templates";
import { Suspense } from "react";
type StoreProps = { params: { countryCode: string } };
const Page = async ({ params }: StoreProps) => {
  const { countryCode } = params;

  return (
    <Suspense
      fallback={
        <div className="grid lg:grid-cols-[200px_1fr] gap-4 grid-cols-1">
          <FilterAccordionSkeleton />
          <ProductCardSkeleton />
        </div>
      }
    >
      <StoreTemplate countryCode={countryCode} />
    </Suspense>
  );
};
export default Page;
