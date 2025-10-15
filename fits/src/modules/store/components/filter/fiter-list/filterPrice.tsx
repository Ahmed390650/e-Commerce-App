"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";
import { useFilter } from ".";
interface altProps {
  max: number;
  min: number;
}
const FilterPrice = ({ max, min }: altProps) => {
  const { toggleFilter } = useFilter();

  const [priceRange, setPriceRange] = React.useState([max, min]);
  const handleSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleInputChange = (index: number, value: string) => {
    const newRange: [number, number] = [...priceRange] as [number, number];
    newRange[index] = Number(value) || 0;
    setPriceRange(newRange);
  };

  return (
    <div className=" flex flex-col gap-2 cursor-pointer">
      {/* Min / Max Inputs */}
      <div className="flex items-center justify-between gap-2 ">
        <div className="space-y-3">
          <Label>الحد الادني</Label>
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="w-20"
          />
        </div>
        <div className="space-y-3">
          <Label>الحد الاقصي</Label>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-20"
          />
        </div>
      </div>
      {/* Slider */}
      <Slider
        min={min}
        max={max}
        step={10}
        value={priceRange}
        onValueCommit={(v) => toggleFilter("price", v.toString(), true)}
        onValueChange={handleSliderChange}
      />
    </div>
  );
};

export default FilterPrice;
