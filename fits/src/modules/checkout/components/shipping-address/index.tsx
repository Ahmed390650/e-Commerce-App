"use client";

import { HttpTypes } from "@medusajs/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useMemo } from "react";
import { mapKeys } from "lodash";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddressSelect from "../address-select";

const addressSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  address_1: z.string().min(1, "Address is required"),
  company: z.string().optional(),
  postal_code: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  country_code: z.string().min(1, "Country is required"),
  province: z.string().optional(),
  phone: z.string().optional(),
});

const formSchema = z.object({
  same_as_billing: z.boolean(),
  email: z.email("Invalid email"),
  shipping_address: addressSchema,
});

type ShippingFormValues = z.infer<typeof formSchema>;

export default function ShippingAddress({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null;
  cart: HttpTypes.StoreCart | null;
  checked: boolean;
  onChange: () => void;
}) {
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: cart?.email || customer?.email || "",
      same_as_billing: true,
      shipping_address: {
        first_name: cart?.shipping_address?.first_name || "",
        last_name: cart?.shipping_address?.last_name || "",
        address_1: cart?.shipping_address?.address_1 || "",
        company: cart?.shipping_address?.company || "",
        postal_code: cart?.shipping_address?.postal_code || "",
        city: cart?.shipping_address?.city || "",
        country_code: cart?.shipping_address?.country_code || "",
        province: cart?.shipping_address?.province || "",
        phone: cart?.shipping_address?.phone || "",
      },
    },
  });

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2) ?? [],
    [cart?.region]
  );

  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion.includes(a.country_code)
      ) ?? [],
    [customer?.addresses, countriesInRegion]
  );

  useEffect(() => {
    form.setValue("same_as_billing", checked);
  }, [checked, form]);

  const onSubmit = (values: ShippingFormValues) => {
    console.log("Shipping data:", values);
    // TODO: connect to Medusa mutation (e.g., setAddresses or similar)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {customer && addressesInRegion.length > 0 && (
          <div className="border rounded-lg p-4">
            <p className="text-sm mb-3">
              Hi {customer.first_name}, do you want to use one of your saved
              addresses?
            </p>
            <AddressSelect
              addresses={customer.addresses}
              addressInput={mapKeys(
                form.getValues().shipping_address,
                (_, k) => k
              )}
              onSelect={(address) =>
                form.reset({
                  ...form.getValues(),
                  shipping_address: {
                    ...address,
                    country_code: address?.country_code ?? "",
                  },
                })
              }
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="shipping_address.first_name"
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
            name="shipping_address.last_name"
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
            name="shipping_address.address_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shipping_address.company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shipping_address.postal_code"
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
            name="shipping_address.city"
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
            name="shipping_address.country_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countriesInRegion.map((code) => (
                      <SelectItem key={code} value={code}>
                        {code.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shipping_address.province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State / Province</FormLabel>
                <FormControl>
                  <Input placeholder="California" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="same_as_billing"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(val) => {
                    field.onChange(val);
                    onChange();
                  }}
                />
              </FormControl>
              <FormLabel>Billing address same as shipping</FormLabel>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shipping_address.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 555 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mt-4">
          Continue to delivery
        </Button>
      </form>
    </Form>
  );
}
