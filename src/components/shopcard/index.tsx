import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { DynamicIcon } from "../landing/DynamicIcon";
import { getDirectionUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ShopCard(shop: any) {
  console.log("shop ",shop)
  return (
    <Card className="w-full max-w-sm px-4 py-2  grid  gap-6">
      <div className="flex flex-col  items-between gap-4">
        <div className="w-full h-66">
          <img
            src={shop.shop.shopImgUrl}
            alt="helo"
            className="object-cover sm:w-full h-40 w-60 sm:h-60 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <h3     style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }} className="text-lg font-semibold">{shop.shop.storeName}</h3>
            {/* <div className="flex items-center gap-2">
              <span className="text-[10px] border px-2 rounded-full border-gray-400 text-gray-600 sh font-medium">
                {shop.shop.wholeSale && shop.shop.retail
                  ? "Wholesale & Retail"
                  : shop.shop.wholeSale
                  ? "Wholesale"
                  : shop.shop.retail
                  ? "Retail"
                  : ""}
              </span>
            </div> */}
          </div>
          <div
            className="text-sm text-gray-500 dark:text-gray-400"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {shop?.shop.address}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPinIcon className="w-4 h-4" />
            <span>{shop?.shop?.district}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <DynamicIcon
              className="w-4 h-4"
              iconName={shop.shop.category.icon }
            />
            <span>{shop.shop.category.name || shop.shop.phone}</span>
          </div>
          <div className=" sm:flex  gap-x-2 my-2">
            <Link
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
              href={getDirectionUrl(
                shop.shop.location.coordinates[1],
                shop.shop.location.coordinates[0]
              )}
            >
              <Button
                size="sm"
                className="w-full bg-gray-700 rounded-full hover:bg-gray-600"
              >
                Get Directions
              </Button>
            </Link>
            <Link href={`/shop/${shop.shop._id}`}>
              <Button
                size="sm"
                className="rounded-full bg-white mt-2 sm:mt-0 text-black hover:bg-gray-100 border-black border w-full"
              >
                View Shop
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MapPinIcon(props: any) {
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
