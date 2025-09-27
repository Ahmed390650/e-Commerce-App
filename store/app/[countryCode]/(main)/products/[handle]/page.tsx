import { retrieveCart } from "@/lib/data/cart";
import { listProducts } from "@/lib/data/products";
import { listRegions } from "@/lib/data/regions";
import RelatedProducts from "@/modules/products/components/related-products";
import ProductTemplates from "@/modules/products/templates";
import ProductDetailsSkeleton from "@/modules/skelekons/skelekon-Product";
import RelatedListProducts from "@/modules/skelekons/skeleton-RelatedList";
import { Metadata } from "next";
import { Suspense } from "react";
type HandleProps = { params: Promise<{ handle: string; countryCode: string }> };

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    );

    if (!countryCodes) {
      return [];
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      });

      return {
        country,
        products: response.products,
      };
    });

    const countryProducts = await Promise.all(promises);

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle);
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    );
    return [];
  }
}
export async function generateMetadata({
  params,
}: HandleProps): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: handle,
    description: "this site for description",
  };
}

const page = async ({ params }: HandleProps) => {
  const { handle, countryCode } = await params;
  const {
    response: { products: product },
  } = await listProducts({ queryParams: { handle }, countryCode });
  const cart = await retrieveCart().catch(() => null);
  return (
    <div>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductTemplates
          product={product[0]}
          cart={cart}
          countryCode={countryCode}
        />
      </Suspense>
      <Suspense fallback={<RelatedListProducts />}>
        <RelatedProducts countryCode={countryCode} product={product[0]} />
      </Suspense>
    </div>
  );
};

export default page;
