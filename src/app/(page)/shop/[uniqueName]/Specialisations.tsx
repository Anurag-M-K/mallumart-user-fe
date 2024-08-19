import { TSpecialisation } from "@/app/type";
import React from "react";

type TSpecialisationProps = {
  specialisation: TSpecialisation[];
};

function Specialisations({ specialisation }: TSpecialisationProps) {
  console.log("specialsisaotn =============> ", specialisation);
  return (
    <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 flex-wrap">
      {specialisation?.map((item: any, key: any) => (
        <div key={key} className="">
          <div className="border border-gray-400 bg-gray-100 rounded-md p-3 text-center">
            {item?.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Specialisations;
