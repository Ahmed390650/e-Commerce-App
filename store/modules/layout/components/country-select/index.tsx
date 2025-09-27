"use client";
import { updateRegion } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { useMutation } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import React, { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CountrySelect = ({ regions }: { regions: HttpTypes.StoreRegion[] }) => {
  const { countryCode } = useParams();
  const currentPath = usePathname().split(`/${countryCode}`)[1];

  const { mutate } = useMutation({
    mutationFn: updateRegion,
  });

  const handleChange = (label: string) => {
    const countryCode = options.find((v) => v?.label === label)?.country;
    if (!countryCode) {
      return null;
    }
    mutate({ countryCode, currentPath });
  };
  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }));
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""));
  }, [regions]);

  return (
    <Select
      onValueChange={handleChange}
      defaultValue={
        countryCode
          ? options?.find((o) => o?.country === countryCode)?.label
          : "eg"
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((o) => (
          <SelectItem key={o?.label} value={o?.label ?? ""}>
            {o?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
