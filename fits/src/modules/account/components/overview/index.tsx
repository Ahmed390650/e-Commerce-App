"use client";

import { convertToLocale } from "@/lib/utils/money";
import { HttpTypes } from "@medusajs/types";
import { ChevronRight, User, MapPin, Package } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null;
  orders: HttpTypes.StoreOrder[] | null;
};

const Overview = ({ customer, orders }: OverviewProps) => {
  const profileCompletion = getProfileCompletion(customer);

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Hello, {customer?.first_name || "Guest"} 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Signed in as{" "}
            <span className="font-medium text-foreground">
              {customer?.email}
            </span>
          </p>
        </div>
      </div>

      {/* Profile & Address Info */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <User className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{profileCompletion}%</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {customer?.addresses?.length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Saved addresses</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Recent Orders</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {orders && orders.length > 0 ? (
            <ul className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <li
                  key={order.id}
                  className="border border-border rounded-lg p-4 flex justify-between items-center hover:bg-muted/40 transition-colors"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-medium">#{order.display_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p>{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p>
                        {convertToLocale({
                          amount: order.total,
                          currency_code: order.currency_code,
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        variant={getStatusVariant(order.fulfillment_status)}
                        className="capitalize"
                      >
                        {order.fulfillment_status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>

                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/account/orders/details/${order.id}`}>
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No recent orders found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// --- Helpers ---

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  if (!customer) return 0;
  let count = 0;
  if (customer.email) count++;
  if (customer.first_name && customer.last_name) count++;
  if (customer.phone) count++;
  if (customer.addresses?.find((a) => a.is_default_billing)) count++;
  return Math.round((count / 4) * 100);
};

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
    case "delivered":
      return "default";
    default:
      return "secondary";
  }
};

export default Overview;
