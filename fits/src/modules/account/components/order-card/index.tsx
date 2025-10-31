"use client";

import { useMemo } from "react";
import { HttpTypes } from "@medusajs/types";
import { convertToLocale } from "@/lib/utils/money";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Thumbnail from "@/modules/products/components/product-gallery/Thumbnail";
import { Package } from "lucide-react";

type OrderCardProps = {
  order: HttpTypes.StoreOrder;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0;
  }, [order]);

  return (
    <Card
      className="hover:shadow-md transition-shadow duration-200"
      data-testid="order-card"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold uppercase flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />#
            {order.display_id}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        <Badge
          variant={getStatusVariant(order.fulfillment_status)}
          className="capitalize"
        >
          {order.fulfillment_status.replace("_", " ")}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Row */}
        <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">
              {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })}
            </span>{" "}
            total
          </span>
          <span>
            {numberOfLines} {numberOfLines > 1 ? "items" : "item"}
          </span>
        </div>

        {/* Product Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {order.items?.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start gap-1"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={item.thumbnail} alt={item.title} />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {item.title}
                </span>
                <span>x{item.quantity}</span>
              </div>
            </div>
          ))}

          {numberOfProducts > 4 && (
            <div className="w-full h-full flex flex-col items-center justify-center border rounded-md text-xs text-muted-foreground">
              + {numberOfProducts - 4} more
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Link href={`/account/orders/details/${order.id}`}>
          <Button
            data-testid="order-details-link"
            variant="secondary"
            size="sm"
          >
            See details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// --- Helper for Status Styling ---
const getStatusVariant = (status: string) => {
  switch (status) {
    case "fulfilled":
      return "default";
    case "shipped":
      return "secondary";
    case "pending":
      return "outline";
    case "canceled":
      return "destructive";
    default:
      return "secondary";
  }
};

export default OrderCard;
