import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import { HttpTypes } from "@medusajs/types";
import { FormSelect } from "@/components/form/FormSelect";
import { SelectItem } from "@/components/ui/select";

const CountrySelect = forwardRef<
  HTMLSelectElement,
  {
    region: HttpTypes.StoreRegion;
  }
>(({ region, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  );

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }));
  }, [region]);

  return (
    <>
      {countryOptions?.map(({ value, label }, index) => (
        <SelectItem key={index} value={value ?? ""}>
          {label}
        </SelectItem>
      ))}
    </>
  );
});

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
