import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  await notificationModuleService.createNotifications({
    to: "",
    channel: "feed",
    template: "admin-ui",
    data: {
      title: "New order",
      description: `A new order has been placed`,
    },
  });
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
