import { retrieveCart } from "@/lib/data/cart";
import { listProducts } from "@/lib/data/products";
import ProductPaginationList from "../components/Product-List";
import {
  FilterButton,
  FilterPriceAccordion,
  FilterProvider,
} from "../components/filter/fiter-list";
import { extractProductFilters, extractUniqueOptions } from "@/lib/utils";

const StoreTemplate = async ({ countryCode }: { countryCode: string }) => {
  const count = await listProducts({ countryCode });
  const [cart, products] = await Promise.all([
    retrieveCart(),
    listProducts({
      countryCode,
      queryParams: {
        limit: count.response.count,
      },
    }),
  ]);
  const type = extractProductFilters(
    products.response.products,
    "type",
    (i) => i.type?.value
  );
  const options = extractUniqueOptions(products.response.products);

  return (
    <div className="grid lg:grid-cols-[200px_1fr] gap-4 grid-cols-1">
      <FilterProvider>
        {options.map(({ title, values }) => (
          <FilterButton
            key={title}
            valueItem={title}
            items={values.map(({ value, count }) => ({ value, count }))}
          />
        ))}
        {<FilterButton valueItem="type" items={type.values} />}
        <FilterPriceAccordion />
      </FilterProvider>
      <ProductPaginationList
        cart={cart}
        countryCode={countryCode}
        initialData={products}
      />
    </div>
  );
};

export default StoreTemplate;
