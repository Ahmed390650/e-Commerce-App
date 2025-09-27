import { retrieveCart } from "@/lib/data/cart";
import ProductPaginationList from "../components/Product-List";
const StoreTemplate = async ({ countryCode }: { countryCode: string }) => {
  const cart = await retrieveCart().catch(() => null);

  return <ProductPaginationList cart={cart} countryCode={countryCode} />;
};

export default StoreTemplate;
