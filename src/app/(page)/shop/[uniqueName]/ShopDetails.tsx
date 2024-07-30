"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CartModal from "@/components/cart-modal";
import { TShop } from "@/app/type";
import { getDirectionUrl } from "@/lib/utils";
import { AvailableTimeSlots } from "@/components/available-time-slots/AvailableTimeSlotsModal";
import { useAuth } from "@/utils/AuthContext";

export default function ShopDetails({ store }: { store: TShop }) {
  const { user } = useAuth();

  return (
    <div className="w-full ">
      <section className="bg-gray-100 sm:p-20 dark:bg-gray-800 py-2 md:py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_STORAGE_BASE_URL}/${store?.store?.shopImgUrl}`}
                alt="helo"
                width={400}
                height={300}
                className="h-auto sm:h-1/2 overflow-hidden   object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid ">

              <h2 className="text-2xl md:text-3xl font-bold">
                {store?.store?.storeName}
                <div className="">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={getDirectionUrl(
                      store?.store?.location?.coordinates[1],
                      store?.store?.location?.coordinates[0]
                    )}
                  >
                    <Button size="sm">Get Directions</Button>
                  </a>
                </div>
              </h2>
              <div className="grid sm:grid-cols-2 ">
                <div className="grid gap-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    Address
                  </span>
                  <p>
                    {store?.store?.address}, {store?.store?.district}
                  </p>
                </div>
                <div className="grid gap-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    Category
                  </span>
                  <p>{store?.store?.category?.name}</p>
                </div>
                <div className="grid gap-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    Phone
                  </span>
                  <p>{store?.store?.phone}</p>
                </div>
                <div className="grid gap-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    Bio
                  </span>
                  <p>{store?.store?.bio}</p>
                </div>
                <div className="grid gap-1">
                  <span className="text-gray-500 dark:text-gray-400"></span>
                  {/* TODO: need to update the phone with whatsapp, once added */}
                </div>
                <div className="hidden sm:flex">
                { store?.store?.storeProviding === "serviceBased" && <AvailableTimeSlots storeId={store?.store?._id} />  }
                <CartModal
              storeId={store?.store?._id}
              storeWhatsapp={store?.store?.phone}
            />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:hidden">
            
            { store?.store?.storeProviding === "serviceBased" && <AvailableTimeSlots storeId={store?.store?._id}/> }
            <CartModal
              storeId={store?.store?._id}
              storeWhatsapp={store?.store?.phone}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
