"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShopCard from "../shopcard";
import { useQuery } from "@tanstack/react-query";
import { fetchShopsByCoordinates } from "@/data/shops";

function    ShopsNearByYou() {
  const [viewAll, setViewAll] = useState<boolean>(false);
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

  const { data: shopsNearBy, isLoading } = useQuery({
    queryFn: () => fetchShopsByCoordinates({ currentLocation }),
    queryKey: ["nearByShops"],
    enabled: !!currentLocation,
    staleTime: 0,
    // cacheTime: 0,
  });

  // useEffect(() => {
  //   if (currentLocation) {
  //     refetch();
  //   }
  // }, []);  
  return (
    <section className="w-full py-12 md:py-16 lg:py-2 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Shops near by
          </h2>
          <p
            onClick={() => setViewAll(!viewAll)}
            className="cursor-pointer text-primary hover:underline"
          >
            View all
          </p>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
            {shopsNearBy
              ?.slice(0, viewAll ? shopsNearBy.length : 8)
              .map((shop: any) => (
                <div
                  key={shop._id}
                  className=" dark:bg-gray-950 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              
                >
                  <ShopCard shop={shop} />
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopsNearByYou;
