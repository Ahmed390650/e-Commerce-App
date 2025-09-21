import { retrieveCart } from "@/lib/data/cart";
import { listProducts } from "@/lib/data/products";
import ProductTemplates from "@/modules/products/templates";
import { Metadata } from "next";
type HandleProps = { params: Promise<{ handle: string; countryCode: string }> };

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
    <ProductTemplates
      product={product[0]}
      cart={cart}
      countryCode={countryCode}
    />
  );
};

export default page;
