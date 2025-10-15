"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export type SortOptions = "price_asc" | "price_desc" | "created_at";
const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
  },
];
const SelectSort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSmall = useMediaQuery("(max-width: 1024px)");

  const onSelectChange = (v: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", v);
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };
  const value = searchParams.get("sort") || "created_at";
  const handleOpen = (open: boolean) => setIsOpen(open);
  if (isSmall) {
    return (
      <Sheet onOpenChange={handleOpen} open={isOpen}>
        <SheetTrigger asChild>
          <div className="flex items-center  gap-1  cursor-pointer">
            <div className="flex ">
              <ArrowUpIcon className="size-4" />
              <ArrowDownIcon className="size-4" />
            </div>
            <span className="text-xs text-accent-foreground first-letter:uppercase">
              sort by
            </span>
          </div>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle className="!text-accent-foreground first-letter:uppercase text-sm">
              sort by
            </SheetTitle>
          </SheetHeader>
          <div className=" mb-4">
            <RadioGroup
              defaultValue={value}
              className="*:aria-[checked=true]:bg-primary-foreground gap-0 group "
              onValueChange={onSelectChange}
            >
              {sortOptions.map((item) => (
                <Label
                  key={item.value}
                  className="flex items-center 
                   gap-2 last:border-b-0  cursor-pointer border-b border-primary-foreground py-4 px-2   has-[button[data-state='checked']]:bg-primary-foreground"
                >
                  <RadioGroupItem value={item.value} id={item.value} />
                  {item.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <Select onValueChange={onSelectChange} defaultValue={value}>
      <SelectTrigger
        value={"created_at"}
        className="rounded-none cursor-pointer "
      >
        <SelectValue defaultValue={value} placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent align="end" className="rounded-none ">
        {sortOptions.map((item) => (
          <SelectItem
            className="cursor-pointer rounded-none "
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectSort;
