import ProductCardSkeleton from "@/modules/skelekons/skelekon-ProductList";
import StoreTemplate from "@/modules/store/templates";
import { Suspense } from "react";
type StoreProps = { params: { countryCode: string } };
const Page = async ({ params }: StoreProps) => {
  const { countryCode } = params;

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-4 grid-cols-1">
      <div></div>
      <Suspense fallback={<ProductCardSkeleton />}>
        <StoreTemplate countryCode={countryCode} />
      </Suspense>
    </div>
  );
};
export default Page;
