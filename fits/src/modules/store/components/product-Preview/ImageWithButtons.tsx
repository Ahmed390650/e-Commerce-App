"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import AddButton from "./AddButton";
import { HeartButton } from "@/components/product/product-line-cart/line-actions";
import Image from "next/image";
import Link from "next/link";
import DotsNavigation from "@/modules/products/components/product-gallery/dots-navigation";
import { StoreProduct } from "@medusajs/types";

const ImageWithButtons = ({ product }: { product: StoreProduct }) => {
  return (
    <Carousel
      className="w-full flex relative overflow-hidden group "
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <AddButton />

      <HeartButton />
      <div className="flex flex-col items-center w-full gap-2">
        <CarouselContent>
          {product.images &&
            product.images.map((img, index) => (
              <CarouselItem key={index} className="flex justify-center ">
                <Link href={`/products/${product.handle}`} className="block">
                  <div className="relative aspect-square border  w-full max-w-lg  ">
                    <Image
                      src={img.url}
                      alt={img.url}
                      width={600}
                      height={600}
                      className="object-cover "
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="absolute   bottom-[-40px]   group-hover:bottom-2 w-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          {product.images && product.images.length > 1 && (
            <DotsNavigation images={product.images} />
          )}
        </div>
      </div>
    </Carousel>
  );
};

export default ImageWithButtons;
