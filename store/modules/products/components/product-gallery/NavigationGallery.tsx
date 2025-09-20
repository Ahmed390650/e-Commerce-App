"use client";
import { useCarousel } from "@/components/ui/carousel";
import cn from "@/lib/utils";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import React from "react";

const NavigationGallery = ({
  images,
}: {
  images: HttpTypes.StoreProductImage[];
}) => {
  const { api } = useCarousel();
  const [current, setCurrent] = React.useState(0);
  if (!images) return null;
  return (
    <div className="flex flex-col gap-2 items-start w-16 h-full overflow-x-hidden">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            current === index ? "border" : "border-none",
            "basis-1/5 relative aspect-[3/4] rounded-sm  border-black hover:border"
          )}
        >
          <div
            className={"p-2"}
            onClick={() => {
              api?.scrollTo(index);
              setCurrent(index);
            }}
          >
            <Image
              src={image.url}
              alt={image.id}
              fill
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavigationGallery;
