import CategoryTemplate from "@/modules/category/templates";
import FilterAccordionSkeleton from "@/modules/skelekons/skelekon-filter";
import ProductCardSkeleton from "@/modules/skelekons/skelekon-ProductList";
import { Suspense } from "react";
type Props = {
  params: Promise<{ category: string[]; countryCode: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

const CategoryPage = async (props: Props) => {
  const params = await props.params;
  return (
    <Suspense
      fallback={
        <div className="grid lg:grid-cols-[200px_1fr] gap-4 grid-cols-1">
          <FilterAccordionSkeleton />
          <ProductCardSkeleton />
        </div>
      }
    >
      <CategoryTemplate
        category={params.category}
        countryCode={params.countryCode}
      />
    </Suspense>
  );
};

export default CategoryPage;
