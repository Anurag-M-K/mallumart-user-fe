"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CartModal from "@/components/cart-modal";
import { TShop } from "@/app/type";
import { getDirectionUrl } from "@/lib/utils";

export default function ShopDetails({ store }: { store: TShop }) {
  return (
    <div className="w-full">
      <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Image
                src={store?.store?.shopImgUrl}
                alt="helo"
                width={400}
                height={300}
                className="w-full overflow-hidden h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                {store?.store?.storeName}
                <div className="mt-4">
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    Address
                  </span>
                  <p>{store?.store?.address}, {store?.store?.district}</p>
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
                  <span className="text-gray-500 dark:text-gray-400"></span>
                  {/* TODO: need to update the phone with whatsapp, once added */}
                  <CartModal
                    storeId={store?.store?._id}
                    storeWhatsapp={store?.store?.phone}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}