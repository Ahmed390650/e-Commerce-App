"use client";
import { Circle, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Thumbnail = ({
  thumbnail,
  alt,
}: {
  thumbnail: string | null;
  alt: string;
}) => {
  return (
    <div className="flex flex-wrap -mx-[8px] w-full h-full">
      <div className="basis-[100%] max-w-[100%] grow-0 shrink-0 px-[8px] h-full">
        <div className="min-h-[130px] h-full">
          <div className="w-full overflow-hidden h-full flex justify-center items-center bg-no-repeat bg-none bg-center  m-0 relative box-border ">
            <div className="basis-[100%] max-w-[100%]  grow-0 shrink-0 px-[8px] ">
              <Image
                src={thumbnail ?? ""}
                alt={alt}
                fill
                className="block
          object-contain
          mix-blend-darken
          opacity-80
          scale-100
          transition
          duration-300
          ease-[cubic-bezier(0.4,0,0.2,1)]
          hover:opacity-100
          hover:scale-130
          animate-fadeIn
        "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
