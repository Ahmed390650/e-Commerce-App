import { useCarousel } from "@/components/ui/carousel";
import cn from "@/lib/utils";
import { HttpTypes } from "@medusajs/types";
import { useEffect, useState } from "react";

const DotsNavigation = ({
  images,
}: {
  images: HttpTypes.StoreProductImage[];
}) => {
  const { api } = useCarousel();
  const [current, setCurrent] = useState(0);
  // Track active slide
  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <div className="flex justify-center gap-2">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "w-3 h-3 rounded-full transition-all",
            current === index ? "bg-purple-600" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
};

export default DotsNavigation;
