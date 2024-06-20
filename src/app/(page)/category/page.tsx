import { fetchAllMainCategory, fetchAllStores } from "@/data/shops";
import ShopsByCategory from "./ShopsByCategory";

export default async function Page({params}:{params:any}) {
  const categories: any = await fetchMinCategory();
  return (
      <ShopsByCategory categories={categories} />
  );
}

const fetchMinCategory = async () => {
  const fetchingMainCategoryResponse :any = await fetchAllMainCategory();
  if(fetchingMainCategoryResponse.status=== 200){
    const responseJson = await fetchingMainCategoryResponse.json();
    return responseJson ?? []; 
  }else{
    console.log("failed to fetch main categories")
  }
  return [];
}

const fetchAllStore = async () => {
  const fetchingAllStoresResponse: any = await fetchAllStores();
  if (fetchingAllStoresResponse.status === 200) {
    const responseJson = await fetchingAllStoresResponse.json();
    return responseJson ?? [];
  } else {
    console.log("Failed to fetch");
  }
  return [];
};
