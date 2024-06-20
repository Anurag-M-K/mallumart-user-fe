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

export default function ShopsByCategory({
  categories,
}: {
  categories: TProductCategories;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { state, dispatch } = useStoreContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString().split("=")[1];

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
    } else {
      router.push(`?`);
    }
    // Fetch the shops by category
    const res = await fetchShopsByCategory({ categoryId: categoryId || query });
    // Dispatch the data to the store context
    dispatch({ type: "SET_STORES", payload: res });
  };
  useEffect(()=>{
    const fetchStoreByCategory:any = async () =>{
      
      if(!state.isSearch){
        const res = await  fetchShopsByCategory({ categoryId: selectedCategory || query })
        console.log("Res ",res)
        dispatch({ type: "SET_STORES", payload: res })
      }
    }
    fetchStoreByCategory()
  },[])


  

  const categoryTitle =
    categories.find((item: TCategories) => item._id === selectedCategory)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading shops</p>} */}
          {state?.stores?.length > 0 ? (
            state?.stores?.map((product: TStore) => (
              <div
                key={product?._id}
                className="group bg-white dark:bg-gray-950 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Card className="w-full max-w-sm p-6 grid gap-6">
                  <div className="grid h-full gap-4">
                    <img
                      src={product?.shopImgUrl}
                      alt={product?.storeName}
                      className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          {product?.storeName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] border px-2 rounded-full border-gray-400 text-gray-600 sh font-medium">
                            {product?.wholeSale && product?.retail
                              ? "Wholesale & Retail"
                              : product?.wholeSale
                              ? "Wholesale"
                              : product?.retail
                              ? "Retail"
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {product?.address}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{product?.district}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <MdOutlinePhoneAndroid className="w-4 h-4" />
                        <span>{product?.phone}</span>
                      </div>
                      <div className="flex gap-x-2 my-2">
                        <a
                          className="w-full"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={getDirectionUrl(
                            product?.location.coordinates[1],
                            product?.location.coordinates[0]
                          )}
                        >
                          <Button
                            size="sm"
                            className="w-full bg-gray-700 hover:bg-gray-600"
                          >
                            Get Directions
                          </Button>
                        </a>
                        <Link href={`/shop/${product._id}`}>
                          <Button
                            size="sm"
                            className="bg-white text-black hover:bg-gray-100 border-black border w-full"
                          >
                            View Shop
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div>
              <h1>No stores found </h1>
            </div>
          )}
          {/* 
          {!isLoading && state.stores.length === 0 && (
            <div className="flex justify-center w-full">
              <p>No shops found for this category</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

function CatIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
    </svg>
  );
}

function MapPinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
