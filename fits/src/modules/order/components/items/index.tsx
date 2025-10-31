import { Separator } from "@/components/ui/separator";
import { HttpTypes } from "@medusajs/types";
import { repeat } from "lodash";
import Item from "../item";

type ItemsProps = {
  order?: HttpTypes.StoreOrder;
};

const Items = ({ order }: ItemsProps) => {
  const items = order?.items ?? [];

  return (
    <div className="flex flex-col" aria-busy={!items.length}>
      <Separator className="!mb-0" />
      <table>
        <body data-testid="products-table">
          {items.length > 0
            ? items
                .sort((a, b) =>
                  (b.created_at ?? "").localeCompare(a.created_at ?? "")
                )
                .map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={order?.currency_code}
                  />
                ))
            : repeat(5).map((i) => <SkeletonLineItem key={i} />)}
        </body>
      </table>
    </div>
  );
};

export default Items;
