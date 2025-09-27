"use client";
import { useCarousel } from "@/components/ui/carousel";
import cn from "@/lib/utils";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import React, { useEffect } from "react";

const NavigationGallery = ({
  images,
}: {
  images: HttpTypes.StoreProductImage[];
}) => {
  const { api } = useCarousel();
  const [current, setCurrent] = React.useState(0);
  if (!images) return null;

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <div className="md:flex flex-col gap-2  w-[15%] h-full overflow-x-hidden hidden ">
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
              className="object-cover rounded-sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavigationGallery;
