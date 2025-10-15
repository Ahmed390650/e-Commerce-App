"use client";

import { AddButtonToCart, useProduct } from "@/components/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import cn from "@/lib/utils";
import { CirclePlusIcon, Loader2Icon, X } from "lucide-react";
import { useState } from "react";

const AddButton = () => {
  const { isMutating, product, options, setOptionValue } = useProduct();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((v) => !v);
  return (
    <div className="">
      <Button
        size="icon-sm"
        onClick={handleOpen}
        variant="secondary"
        className="rounded-full size-6 absolute bottom-5 right-2.5 z-10 cursor-pointer bg-[#ffffff80] hover:bg-[#fff]"
      >
        <CirclePlusIcon className="size-4" />
      </Button>

      <div
        className={cn(
          "absolute right-0 bottom-0 z-20 w-full h-full overflow-hidden bg-white border  transition-all duration-500 ease-in-out",
          isOpen ? "h-[150px]   opacity-100" : "h-0   opacity-0"
        )}
      >
        <div className="p-3 flex flex-col gap-2 h-full justify-between">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-medium text-gray-700">Size Options</h1>
            <span
              className="cursor-pointer text-sm font-semibold text-accent-foreground hover:text-red-500 transition"
              onClick={handleOpen}
            >
              <X className="w-4 h-4" />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {product.options &&
              product.options.map(({ id, values }) => (
                <div className="flex gap-2" key={id}>
                  {values?.map((option) => (
                    <Badge
                      variant={
                        options[id] === option.value ? "default" : "outline"
                      }
                      onClick={() => setOptionValue(id, option.value)}
                      className="cursor-pointer shrink flex-1 rounded-none"
                      key={option.id}
                    >
                      {option.value}
                    </Badge>
                  ))}
                </div>
              ))}
          </div>
          <AddButtonToCart className="rounded-none uppercase w-full">
            {isMutating && <Loader2Icon className="animate-spin mr-2" />}
            add to cart
          </AddButtonToCart>
        </div>
      </div>
    </div>
  );
};

export default AddButton;
