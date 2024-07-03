"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import placeholder from "/public/placeholder.svg";
import * as Tooltip from "../components/ui/tooltip";
import Image from "next/image";
import CustomIconifyIcon from "./CustomIconifyIcon/CustomIconifyIcon";

function CategorySlide({ category, index }: { category: any; index: any }) {
  const [currentLocation, setCurrentLocation] = useState<any>();
  
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ latitude, longitude });
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <Link
        href={`/category/?category=${category?._id}&latitude=${currentLocation?.latitude}&longitude=${currentLocation?.longitude}`}
        className="group flex-none  snap-x w-20 md:w-44 relative rounded-lg overflow-hidden"
        prefetch={false}
      >
        <Image
          src={placeholder}
          alt="helo"
          width={400}
          height={300}
          className="w-full  h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className={`absolute  inset-0 ${
            (index + 1) % 3 === 0
              ? "bg-[#036fb7]"
              : (index + 1) % 3 === 2
              ? "bg-[#293389]"
              : "bg-[#652c92]"
          } flex flex-col items-center justify-center text-white font-medium text-lg transition-colors duration-300 group-hover:bg-black/30`}
        >
          <Tooltip.TooltipProvider key={category._id}>
            <Tooltip.Tooltip>
              <Tooltip.TooltipTrigger asChild>
                <CustomIconifyIcon
                  className="sm:text-5xl text-3xl md:text-7xl"
                  name={category.icon}
                />
              </Tooltip.TooltipTrigger>
              <Tooltip.TooltipPortal>
                <Tooltip.TooltipContent>{category.name}</Tooltip.TooltipContent>
              </Tooltip.TooltipPortal>
            </Tooltip.Tooltip>
          </Tooltip.TooltipProvider>
          <p className="text-[10px]">{category?.name}</p>
        </div>
      </Link>
    </>
  );
}

export default CategorySlide;
