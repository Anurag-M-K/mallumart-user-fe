import React from "react";
import ShopDetails from "./ShopDetails";
import { fetchStoreByUniqueName } from "@/data/advertisement";
import ProductsListing from "./ProductsListing";
import { TDoctors, TShop, TSpecialisation } from "@/app/type";
import { DoctorsCard } from "./DoctorsCard";
import { fetchAllDoctors, fetchAllSpecialisations } from "@/data/doctors";
import HospitalDetails from "./HospitalDetails";
import HospitalService from "./HospitalService";

type TPageProps = {
  params: { uniqueName: string };
};
export default async function Page({ params }: TPageProps) {
  const store: TShop = await fetchStore(params?.uniqueName);
  const doctors: TDoctors[] = await fetchDoctors(params?.uniqueName);
  const specialisations: TSpecialisation[] = await fetchSpecialisations(
    params?.uniqueName
  );

  console.log("specialisatinos ", specialisations);
  return (
    <>
      {store?.store?.category?.name === "Hospital" ? (
        <>
          <div className="z-10">
            <HospitalDetails store={store} />
          </div>
          <div className="z-40 sm:relative md:-mt-20  ">
            <HospitalService
              doctors={doctors}
              specialisations={specialisations}
            />
          </div>
        </>
      ) : (
        <>
          <ShopDetails store={store} />
          <ProductsListing store={store} />
        </>
      )}
    </>
  );
}

const fetchStore = async (uniqueName: string) => {
  const fetchingStoreResponse: any = await fetchStoreByUniqueName(uniqueName);
  if (fetchingStoreResponse.status === 200) {
    const responseJson = await fetchingStoreResponse.json();
    return responseJson ?? [];
  } else {
    console.error("Failed to fetch store data");
  }
  return [];
};

const fetchDoctors = async (uniqueName: string) => {
  const fetchingDOctorsResponse: any = await fetchAllDoctors(uniqueName);
  if (fetchingDOctorsResponse.status === 200) {
    const responseJson = await fetchingDOctorsResponse.json();
    return responseJson ?? [];
  } else {
    console.log("Failed to fetch doctors");
  }
};

const fetchSpecialisations = async (uniqueName: string) => {
  const fetchingSpecialisationResponse: any = await fetchAllSpecialisations(
    uniqueName
  );
  if (fetchingSpecialisationResponse.status === 200) {
    const responseJson = await fetchingSpecialisationResponse.json();
    return responseJson ?? [];
  } else {
    console.log("failed to fetch specialisations");
  }
};
