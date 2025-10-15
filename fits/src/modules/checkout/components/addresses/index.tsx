"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setAddresses } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";

// 🧾 Zod validation schema
const addressSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  address_1: z.string().min(1, "Address is required"),
  address_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  country_code: z.string().min(2, "Country code required"),
  phone: z.string().optional(),
});

const formSchema = z.object({
  shipping: addressSchema,
  billing: addressSchema.optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Addresses({ cart }: { cart: HttpTypes.StoreCart }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "address";
  const [sameAsBilling, setSameAsBilling] = React.useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipping: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        postal_code: "",
        country_code: "US",
        phone: "",
      },
      billing: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        postal_code: "",
        country_code: "US",
      },
    },
  });

  async function onSubmit(values: FormValues) {
    setAddresses(_, values);
    router.push(`${pathname}?step=delivery`);
  }
  const shipping = form.watch("shipping");
  const billing = form.watch("billing");
  const handleEdit = () => router.push(`${pathname}?step=address`);

  return (
    <Card className="bg-white border shadow-sm rounded-2xl">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          Shipping Address
          {!isOpen && <CheckCircle2 className="w-5 h-5 text-green-600" />}
        </CardTitle>

        {!isOpen && cart?.shipping_address && (
          <Button variant="link" className="text-primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {isOpen ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (er) => {
                console.log(er);
              })}
              className="space-y-10"
            >
              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-base font-medium">Shipping Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="shipping.first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping.last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping.address_1"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping.address_2"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt, suite, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping.postal_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping.country_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country Code</FormLabel>
                        <FormControl>
                          <Input placeholder="US" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 234 567 890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">Billing Address</h3>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={sameAsBilling}
                      onCheckedChange={setSameAsBilling}
                    />
                    <span className="text-sm text-muted-foreground">
                      Same as shipping
                    </span>
                  </div>
                </div>

                {!sameAsBilling && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="billing.first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billing.last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billing.address_1"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billing.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billing.postal_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <CardFooter className="flex justify-end pt-6">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Continue to delivery
                </Button>
              </CardFooter>
            </form>
          </Form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Shipping Address */}
            <Card data-testid="shipping-address-summary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>
                  {shipping.first_name} {shipping.last_name}
                </p>
                <p>
                  {shipping.address_1} {shipping.address_2}
                </p>
                <p>
                  {shipping.postal_code}, {shipping.city}
                </p>
                <p>{shipping.country_code?.toUpperCase()}</p>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card data-testid="shipping-contact-summary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>{shipping.phone || "—"}</p>
                <p>{cart.email || "—"}</p>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card data-testid="billing-address-summary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                {sameAsBilling ? (
                  <p>Billing and delivery address are the same.</p>
                ) : billing ? (
                  <>
                    <p>
                      {billing.first_name} {billing.last_name}
                    </p>
                    <p>
                      {billing.address_1} {billing.address_2}
                    </p>
                    <p>
                      {billing.postal_code}, {billing.city}
                    </p>
                    <p>{billing.country_code?.toUpperCase()}</p>
                  </>
                ) : (
                  <p>No billing address available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>

      <Separator className="mt-6" />
    </Card>
  );
}
