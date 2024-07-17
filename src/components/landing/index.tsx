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

type TCarousalItem = {
  img:string;
  _id:number;
}
export default async function Landing() {
  const { advertisement } = await getAdvertisementData();
  const categories:any  = await getCategoriesData();
  
  const carousalItem:TCarousalItem[] = [
    {img:"/slider.png",_id:1},
    {img:"/slider2.png",_id:2},
    {img:"/slider3.png",_id:3},
    {img:"/slider4.jpg",_id:4},
  ]
  const mbcCrousalItem:TCarousalItem[] = [
    {img:"/slide1.jpg",_id:1},
    {img:"/slide2.jpg",_id:2},
    {img:"/slide3.jpg",_id:3},
    {img:"/slide4.jpg",_id:4},
  ]

  const mainCategories = categories?.categories?.filter((item:any)=>item.isShowOnHomePage === true)
  return (
    <div className="w-full ">
      <section className="w-full">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full h-auto max-w-[1340px] mx-auto relative"
        >
            <CarouselContent className="md:hidden flex h-[230px] mt-4 relative bg-black overflow-x-auto snap-x snap-mandatory">
            {mbcCrousalItem?.map((item: TCarousalItem) => (
              <CarouselItem key={item._id} className="relative w-full h-full flex-shrink-0 snap-center">
                <Image
                  src={item.img}
                  alt={`Advertisement ${item._id}`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full overflow-hidden object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselContent className="hidden md:flex h-[500px] relative bg-black">
            {/* {advertisement?.map((item: TAdvertisement) => ( */}
            {carousalItem?.map((item: any) => (
              <CarouselItem key={item._id} className="relative w-full h-full">
                {/* <Image
                  src={item.image}
                  alt={`Advertisement ${item._id}`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full overflow-hidden object-cover group-hover:scale-105 transition-transform duration-300"
                /> */}
                <Image
                  src={item.img}
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

      <section className="w-full py-3 md:py-4 lg:py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-2 md:mb-8">
            <h2 className="text-xl font-bold tracking-tight md:text-3xl">
              Shop by Category
            </h2>
          </div>

          <section>
            <div className=" ">
              <div className="flex flex-col  gap-x-6">
                <div className="flex snap-x  snap-mandatory no-scrollbar overflow-x-auto gap-x-6 ">
                  {mainCategories?.map((category: any, index: any) => (
                    // <div className="">
                    <CategorySlide key={category?._id} category={category} index={index} />
                    // <p>{category?.name}</p>
                    // </div>
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
