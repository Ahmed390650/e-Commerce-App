import { listProducts } from "@/lib/data/products";
import ProductTemplates from "@/modules/products/templates";
import { Metadata } from "next";
type HandleProps = { params: Promise<{ handle: string }> };

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
  const { handle } = await params;

  const {
    response: { products: product },
  } = await listProducts({ queryParams: { handle }, countryCode: "eg" });

  return <ProductTemplates product={product[0]} />;
};

export default page;
