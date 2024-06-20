import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";

import placeholder from "/public/placeholder.svg";
import Image from "next/image";
import ShopsNearByYou from "../near-shops/ShopsNearByYou";
import { fetchAdvertisements, fetchCategories } from "@/data/advertisement";
import { TAdvertisement } from "@/app/type";
import CategorySlide from "../CategorySlide";

export default async function Landing() {
  const { advertisement } = await getAdvertisementData();
  const categories = await getCategoriesData();

  return (
    <div className="w-full ">
      <section className="w-full">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full h-auto max-w-[1340px] mx-auto relative"
        >
          <CarouselContent className=" h-[500px] relative bg-black">
            {advertisement?.map((item: TAdvertisement) => (
              <CarouselItem key={item._id} className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={`Advertisement ${item._id}`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full overflow-hidden object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <CarouselPrevious className="bg-white/50 hover:bg-white/75 text-gray-900 rounded-full p-2 cursor-pointer transition-colors" />
            <CarouselNext className="bg-white/50 hover:bg-white/75 text-gray-900 rounded-full p-2 cursor-pointer transition-colors" />
          </div>
        </Carousel>
      </section>

      <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Shop by Category
            </h2>
          </div>

          <section className=" py-12 md:py-16  lg:py-20">
            <div className="container ">
              <div className="flex flex-col  gap-6">
                <div className="flex snap-x  snap-mandatory no-scrollbar overflow-x-auto gap-6 pb-4">
                  {categories?.categories?.map((category: any, index: any) => (
                    <CategorySlide key={category?._id} category={category} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <ShopsNearByYou />
    </div>
  );
}

const getAdvertisementData = async () => {
  const fetchingAdvertisementResponse: any = await fetchAdvertisements();
  if (fetchingAdvertisementResponse.status === 200) {
    const responseJson = await fetchingAdvertisementResponse.json();
    return {
      advertisement: responseJson ?? [],
    };
  } else {
    console.log("Failed to fetch advertisement");
    return {
      advertisement: [],
    };
  }
};

export const getCategoriesData = async () => {
  const fetchingCategoriesResponse: any = await fetchCategories();
  if (fetchingCategoriesResponse.status === 200) {
    const responseJson = await fetchingCategoriesResponse.json();
    return {
      categories: responseJson ?? [],
    };
  } else {
    console.log("Failded to fetch categories");
  }
};
