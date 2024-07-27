import React from "react";
import ShopDetails from "./ShopDetails";
import { fetchStoreByUniqueName } from "@/data/advertisement";
import ProductsListing from "./ProductsListing";
import { TShop } from "@/app/type";

type TPageProps = {
  params: { uniqueName: string };
};
export default async function Page({ params }: TPageProps) {
  const store: TShop = await fetchStore(params?.uniqueName);

  return (
    <div>
      <ShopDetails store={store} />
      {/* {store?.store?.storeProviding !== "serviceBased" && ( */}
        <ProductsListing store={store} />
      {/* )} */}
    </div>
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
