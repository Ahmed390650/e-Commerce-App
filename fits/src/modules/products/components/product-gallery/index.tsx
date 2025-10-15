// app/components/ProductGallery.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import NavigationGallery from "./NavigationGallery";
import DotsNavigation from "./dots-navigation";

export default function ProductGallery({
  images,
}: {
  images: HttpTypes.StoreProductImage[] | null;
}) {
  if (!images || images.length === 0) {
    return null;
  }
  return (
    <div className="w-full max-w-2xl ">
      <Carousel
        className="w-full flex   gap-2"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <NavigationGallery images={images} />
        <div className="flex flex-col items-center w-full gap-2">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="flex justify-center ">
                <div className="relative aspect-square border  w-full max-w-lg rounded-sm">
                  <Image
                    src={img.url}
                    alt={img.url}
                    width={600}
                    height={600}
                    className="object-cover rounded-sm"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <DotsNavigation images={images} />
        </div>
      </Carousel>
    </div>
  );
}
