"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import cn from "@/lib/utils";
import { XIcon } from "lucide-react";
import React, { useContext } from "react";
import useFilterButton from "../hooks/useFilterButton";
import FilterPrice from "./filterPrice";

interface FilterContextValue {
  toggleFilter: (
    label: string,
    value: string,
    checked: string | boolean
  ) => void;
}
const FilterContextProvider = React.createContext<FilterContextValue | null>(
  null
);
interface FilterProps {
  children: React.ReactNode;
}
const useFilter = () => {
  const context = useContext(FilterContextProvider);
  if (!context) {
    throw new Error("no context provide for filter");
  }
  return context;
};
const FilterProvider = ({ children }: FilterProps) => {
  const { toggleFilter } = useFilterButton();
  return (
    <FilterContextProvider.Provider value={{ toggleFilter }}>
      <Accordion type="single" collapsible>
        {children}
      </Accordion>
    </FilterContextProvider.Provider>
  );
};
const ITEMSTOSHOW = 7;
const SelectedFilterList = () => {
  const { activesFilter, toggleFilter, clearFilter } = useFilterButton();
  const valuesActive = Object.entries(activesFilter).reduce(
    (acc, [label, values]) => [...acc, ...values.map((v) => ({ label, v }))],
    [] as { label: string; v: string }[]
  );
  if (valuesActive.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      <Label>Selected Filters:</Label>
      <ButtonGroup className="flex flex-wrap gap-y-2">
        {valuesActive.map((v, i) => (
          <React.Fragment key={v.v}>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => toggleFilter(v.label, v.v, false)}
            >
              <span>{v.v}</span>
              <XIcon className="size-4" />
            </Button>
          </React.Fragment>
        ))}
      </ButtonGroup>
      <Button onClick={clearFilter} variant={"ghost"}>
        Clear Selected Filters
      </Button>
    </div>
  );
};
type Filter = {
  valueItem: string;
  items: { value: string; count?: number }[];
};
const FilterButton = ({ valueItem, items }: Filter) => {
  const [showMore, setShowMore] = React.useState(false);
  const filteredItems = showMore ? items : items.slice(0, ITEMSTOSHOW);
  const isColor = valueItem.toLowerCase() === "color";
  return (
    <AccordionItem value={valueItem}>
      <AccordionTrigger className="font-semibold first-letter:uppercase">
        {valueItem}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1 w-full">
        {filteredItems.map((item) => (
          <CheckboxItem
            key={item.value}
            value={item.value}
            valueItem={valueItem}
            style={isColor ? { backgroundColor: item.value.toLowerCase() } : {}}
          >
            {item.value}
          </CheckboxItem>
        ))}
        {items.length > ITEMSTOSHOW && (
          <div className="flex justify-start">
            <Button
              className=" cursor-pointer p-0 m-0"
              onClick={() => setShowMore((prev) => !prev)}
              variant={"link"}
            >
              -Show {showMore ? "less" : "more"}
            </Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
const FilterButtonSheet = ({ items, valueItem }: Filter) => {
  const [showMore, setShowMore] = React.useState(false);

  const filteredItems = showMore ? items : items.slice(0, ITEMSTOSHOW);
  const isColor = valueItem.toLowerCase() === "color";

  return (
    <AccordionItem value={valueItem}>
      <AccordionTrigger className="font-semibold first-letter:uppercase">
        {valueItem}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1 w-full">
        {filteredItems.map((item) => (
          <CheckboxItem
            key={item.value}
            value={item.value}
            valueItem={valueItem}
            style={isColor ? { backgroundColor: item.value.toLowerCase() } : {}}
          >
            {item.value}
          </CheckboxItem>
        ))}
        {items.length > ITEMSTOSHOW && (
          <div className="flex justify-start">
            <Button
              className=" cursor-pointer p-0 m-0"
              onClick={() => setShowMore((prev) => !prev)}
              variant={"link"}
            >
              -Show {showMore ? "less" : "more"}
            </Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
const CheckboxItem = ({
  value,
  children,
  valueItem,
  ...props
}: {
  value: string;
  children: React.ReactNode;
  valueItem: string;
} & React.ComponentProps<typeof Checkbox>) => {
  const { isActiveFilter, toggleFilter } = useFilterButton();
  const valuesCheck = isActiveFilter(valueItem, value);
  return (
    <Label htmlFor={value} className="flex gap-2 cursor-pointer">
      <Checkbox
        id={value}
        defaultChecked={valuesCheck}
        checked={valuesCheck}
        value={value}
        className={cn("cursor-pointer rounded-none bg-accent")}
        onCheckedChange={(e) => {
          toggleFilter(valueItem, value, e);
        }}
        {...props}
      />
      {children}
    </Label>
  );
};
const FilterPriceAccordion = () => {
  return (
    <AccordionItem value={"price"}>
      <AccordionTrigger>price</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1">
        <FilterPrice max={1000} min={10} />
      </AccordionContent>
    </AccordionItem>
  );
};
export {
  FilterButton,
  FilterPriceAccordion,
  FilterProvider,
  SelectedFilterList,
  useFilter,
};
