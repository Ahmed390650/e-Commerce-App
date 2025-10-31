"use client";

import { HttpTypes } from "@medusajs/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus = true }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    if (!str) return "-";
    const formatted = str.split("_").join(" ");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "fulfilled":
      case "paid":
        return "default";
      case "pending":
        return "outline";
      case "shipped":
        return "secondary";
      case "canceled":
      case "refunded":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="border border-border">
      <CardContent className="pt-6 space-y-3">
        {/* Email Info */}
        <p className="text-sm text-muted-foreground">
          We’ve sent the order confirmation details to{" "}
          <span
            className="font-semibold text-foreground"
            data-testid="order-email"
          >
            {order.email}
          </span>
          .
        </p>

        {/* Order Info */}
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">
            Order date:{" "}
            <span
              className="text-foreground font-medium"
              data-testid="order-date"
            >
              {new Date(order.created_at).toLocaleDateString()}
            </span>
          </p>

          <p className="text-muted-foreground">
            Order number:{" "}
            <span
              className="font-semibold text-foreground"
              data-testid="order-id"
            >
              #{order.display_id}
            </span>
          </p>
        </div>

        {/* Status Info */}
        {showStatus && (
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Order status:
              </span>
              <Badge
                variant={getStatusVariant(order.fulfillment_status)}
                data-testid="order-status"
                className="capitalize"
              >
                {formatStatus(order.fulfillment_status)}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Payment status:
              </span>
              <Badge
                variant={getStatusVariant(order.payment_status)}
                data-testid="order-payment-status"
                className="capitalize"
              >
                {formatStatus(order.payment_status)}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
