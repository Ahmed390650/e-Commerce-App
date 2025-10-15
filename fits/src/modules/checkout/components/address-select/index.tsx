"use client";

import { useMemo } from "react";
import { HttpTypes } from "@medusajs/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import compareAddresses from "@/lib/utils/compare-addresses";

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[];
  addressInput: HttpTypes.StoreCartAddress | null;
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void;
};

/**
 * Shadcn-based Address Select
 */
export default function AddressSelect({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) {
  // Find the address currently matching the form’s address input
  const selectedAddress = useMemo(
    () => addresses.find((a) => compareAddresses(a, addressInput)),
    [addresses, addressInput]
  );

  const handleSelect = (id: string) => {
    const selected = addresses.find((a) => a.id === id);
    if (selected) onSelect(selected as HttpTypes.StoreCartAddress);
  };

  return (
    <FormItem className="space-y-2">
      <FormLabel>Saved addresses</FormLabel>
      <FormControl>
        <Select onValueChange={handleSelect} value={selectedAddress?.id ?? ""}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose an address" className="truncate">
              {selectedAddress
                ? formatAddressShort(selectedAddress)
                : "Choose an address"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {addresses.map((address) => (
              <SelectItem key={address.id} value={address.id}>
                <Card className="p-2">
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">
                      {address.first_name} {address.last_name}
                    </span>
                    {address.company && (
                      <span className="text-muted-foreground text-xs">
                        {address.company}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {address.address_1}
                      {address.address_2 && `, ${address.address_2}`}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {address.postal_code}, {address.city}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {address.province && `${address.province}, `}
                      {address.country_code?.toUpperCase()}
                    </span>
                  </div>
                </Card>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );
}

//
// Utility to render short label for the trigger.
//
function formatAddressShort(address: HttpTypes.StoreCustomerAddress) {
  const base = `${address.address_1}${
    address.address_2 ? `, ${address.address_2}` : ""
  }`;
  const city = `${address.city ?? ""}${
    address.postal_code ? `, ${address.postal_code}` : ""
  }`;
  return `${base}, ${city}`;
}
