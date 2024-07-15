import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { getDirectionUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import CustomIconifyIcon from "../CustomIconifyIcon/CustomIconifyIcon";
import { IoMdCall } from "react-icons/io";
import { FaDirections } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ShopCard(shop: any) {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/shop/${shop?.shop?.uniqueName}`);
  };

  return (

    <Card onClick={handleCardClick}  className="sm:w-full cursor-pointer max-w-sm px-2 py-2  grid  gap-6">
      <div className="flex flex-col items-between gap-4">
        <div className="sm:w-full h-44   sm:h-64 relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_STORAGE_BASE_URL}/${shop?.shop?.shopImgUrl}`}
            alt="shop image"
            style={{ objectFit: "cover" }}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* <img
            className="object-cover sm:w-full h-40 w-60 sm:h-60 group-hover:scale-105 transition-transform duration-300"
          /> */}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <h3
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className="text-lg font-semibold"
            >
              { shop?.shop?.storeName?.length > 15 ? `${shop?.shop?.storeName?.substring(0, 13)}...` : shop?.shop?.storeName?.substring(0,15)}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPinIcon className="w-4 h-4" />
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {shop?.shop?.address?.length > 15
                ? `${shop?.shop?.address?.substring(0, 15)}...`
                : shop?.shop?.address}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CustomIconifyIcon
              className="w-4 h-4"
              name={shop?.shop?.category?.icon}
            />
            <span>{shop?.shop?.category?.name || shop?.shop?.phone}</span>
          </div>
          <div className=" flex  gap-x-1 my-2">
            <Link
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
              href={getDirectionUrl(
                shop?.shop?.location?.coordinates[1],
                shop?.shop?.location?.coordinates[0]
              )}
              onClick={(e)=>e.stopPropagation()}
            >
            <Button
                size="sm"
                className="w-full text-sm bg-gray-700 rounded-full hover:bg-gray-600"
              >
                <FaDirections  size={18} className="hidden sm:flex me-2 left-0" />

              <span className="hidden sm:flex sm:me-2">Get</span> Directions
              </Button>
            </Link>
              <Button
              onClick={(e)=>{
                e.stopPropagation()
                window.location.href = `tel:${shop?.shop?.phone}`
              }}
                size="sm"
                className="text-sm rounded-full bg-white  sm:mt-0 text-black hover:bg-gray-100 border-black border "
                >
               <IoMdCall className="w-4 h-4" />
               <span className="hidden sm:flex ms-1">Call</span>
               
                </Button>
                
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
