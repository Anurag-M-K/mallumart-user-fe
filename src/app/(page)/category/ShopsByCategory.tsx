"use client";

import { SVGProps, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { TCategories, TProductCategories, TStore } from "@/app/type";
import { useQuery } from "@tanstack/react-query";
import { fetchShopsByCategory } from "@/data/shops";
import { getDirectionUrl } from "@/lib/utils";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { useStoreContext } from "@/utils/StoreContext";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ShopCard from "@/components/shopcard";

export default function ShopsByCategory({
  categories,
}: {
  categories: TProductCategories;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { state, dispatch } = useStoreContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("category");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const [currentLocation, setCurrentLocation] = useState<any>({
    latitude,
    longitude,
  });

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ latitude, longitude });
    });
  };
  const fetchStoreInitially = async () => {
    if (currentLocation?.latitude && currentLocation?.longitude) {
      const res = await fetchShopsByCategory({
        categoryId: query,
        currentLocation,
      });
      // Dispatch the data to the store context
      dispatch({ type: "SET_STORES", payload: res });
    }
  };

  useEffect(() => {
    getCurrentLocation();
    fetchStoreInitially();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  const handleCategoryClick = async (
    categoryId: string | null
  ): Promise<void> => {
    // Update the URL with the selected category
    if (categoryId) {
      router.push(`?category=${categoryId}`);
      setSelectedCategory(categoryId);
    } else {
      router.push(`?`);
      setSelectedCategory(null);
      console.log("in onclick");
      // fetchStoreInitially()
    }
    // Fetch the shops by category
    const res = await fetchShopsByCategory({
      categoryId: categoryId || query,
      currentLocation,
    });
    // Dispatch the data to the store context
    dispatch({ type: "SET_STORES", payload: res });
  };
  useEffect(() => {
    const fetchStoreByCategory: any = async () => {
      if (!state.isSearch) {
        const res = await fetchShopsByCategory({
          categoryId: selectedCategory || query,
          currentLocation,
        });
        dispatch({ type: "SET_STORES", payload: res });
      }
    };
    fetchStoreByCategory();
  }, [selectedCategory, query, currentLocation, state?.isSearch]);

  const categoryTitle =
    categories.find((item: TCategories) => item?._id === selectedCategory)
      ?.name || "All Categories";

  return (
    <div className="w-full">
      <header className=" dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-2xl font-bold">{categoryTitle}</h1>
        </div>
      </header>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8 px-4 md:px-6">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => handleCategoryClick(null)}
            >
              All Categories
            </Button>
            {categories.map((category: TCategories) => (
              <Button
                key={category._id}
                variant={
                  selectedCategory === category._id ? "default" : "outline"
                }
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
          {state?.stores?.length > 0 ? (
            state?.stores?.map((product: TStore) => (
              <div key={product?._id} className="group">
                <ShopCard shop={product} />
              </div>
            ))
          ) : (
            <div>
              <h1>No stores found </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
