import { listOrders } from "@/lib/data/orders";
import OrderOverview from "@/modules/account/components/order-overview";
import React from "react";

const page = async () => {
  const orders = await listOrders();
  return <OrderOverview orders={orders} />;
};

export default page;
