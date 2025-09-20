import { Button } from "@/components/ui/button";
import cn from "@/lib/utils";
import { HttpTypes } from "@medusajs/types";
import React from "react";

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption;
  title: string;
  "data-testid"?: string;
  current: string | undefined;
  updateOption: (title: string, value: string) => void;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  title,
  current,
  "data-testid": dataTestId,
  updateOption,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value);
  return (
    <div className="flex flex-col gap-y-3">
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <Button
              onClick={() => updateOption(option.id, v)}
              variant={current === v ? "default" : "outline"}
              size={"lg"}
              key={v}
              className={cn("rounded-rounded p-2 flex-1")}
              data-testid="option-button"
            >
              {v}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
