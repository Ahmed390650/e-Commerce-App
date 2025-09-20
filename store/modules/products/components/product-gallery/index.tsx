"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import NavigationGallery from "./NavigationGallery";

const ImageGallery = ({
  images,
}: {
  images: HttpTypes.StoreProductImage[] | null;
}) => {
  if (!images) return null;
  return (
    <Carousel
      opts={{
        align: "center",

        loop: true,
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={image.id} // always take full width (1 image per slide)
              className="basis-full"
            >
              <Card className="overflow-hidden rounded-sm ">
                <CardContent className="relative aspect-[3/4] p-0">
                  <Image
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <NavigationGallery images={images} />
      </div>
    </Carousel>
  );
};

export default ImageGallery;
