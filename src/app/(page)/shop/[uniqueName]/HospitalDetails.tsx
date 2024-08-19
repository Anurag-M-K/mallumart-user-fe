import { TShop } from "@/app/type";
import { MapPinIcon } from "lucide-react";
import React from "react";

function HospitalDetails({ store }: { store: TShop }) {
  return (
    <div className="bg-gradient-to-r from-blue-700 h-auto py-4 w-full grid grid-cols-2">
      <div className="mx-4 flex flex-col   justify-center items-start sm:items-center text-white">
        <h1 className="text-white text-lg sm:text-3xl">
          Book an appointment at {store?.store?.storeName}
        </h1>
        <h3 className="flex mt-2 text-start gap-x-2 items-center justify-center">
          <MapPinIcon className="w-3  h-4  text-[4px] sm:h-4" /> {store?.store?.address}
        </h3>
      </div>

      <div className="flex justify-center items-center  ">
        <img
          className="right-0  w-4/6"
          src="/doctorsBanner.svg"
          alt="hospital image"
        />
      </div>
    </div>
  );
}

export default HospitalDetails;
