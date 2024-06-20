import React from 'react';
import ShopDetails from './ShopDetails';
import { fetchStoreById } from '@/data/advertisement';
import ProductsListing from './ProductsListing';
import { TShop } from '@/app/type';

type TPageProps = {
  params: { shopId: string };
}

export default async function Page({ params }: TPageProps) {
  const store:TShop = await fetchStore(params.shopId);

  console.log("store == > ",store)
  return (
    <div>
      <ShopDetails store={store} />
      <ProductsListing store={store}/>
    </div>
  );
}

const fetchStore = async (shopId: string) => {
  const fetchingStoreResponse: any = await fetchStoreById(shopId);
  if (fetchingStoreResponse.status === 200) {
    const responseJson = await fetchingStoreResponse.json();
    return responseJson ?? [];
  } else {
    console.error("Failed to fetch store data");
  }
  return [];
}
