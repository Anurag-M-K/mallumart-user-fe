import { TFilters } from "@/app/type";
import { clientFetch, serverFetch } from "@/lib/api";

export const fetchShopsByCoordinates = async ({
  currentLocation,
}: {
  currentLocation: any;
}) => {
  if (!currentLocation) {
    return [];
  }
  const { longitude, latitude } = currentLocation;

  if (longitude === undefined || latitude === undefined) {
    return [];
  }

  try {
    const res = await clientFetch(
      `store/near-by-shop/${longitude}/${latitude}`
    );
    // if(!res.ok){
    //     console.log("failed to fetch shops : ",res);
    //     return []
    // }
    return res;
  } catch (error) {
    console.log("Error fetching shops : ", error);
    return [];
  }
};

export const fetchProducts = async ({
  filters,
  storeId,
  page,
}: {
  filters: TFilters;
  storeId: string;
  page: number;
}) => {
  if (!storeId) {
    return [];
  }
  try {
    const res = await clientFetch(
      `product/fetch-products?storeId=${storeId}&category=${filters.category}&sort=${filters.sort}&searchTerm=${filters.search}&page=${page}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchShopsByCategory = async ({
  categoryId,
  currentLocation
}: {
  categoryId: any;
  currentLocation:any;
}) => {
  try {
    const res = await clientFetch(
      `store/fetch-store-by-category?categoryId=${categoryId}&latitude=${currentLocation?.latitude}&longitude=${currentLocation?.longitude}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductById = async (id: string) => {
  return await serverFetch(`product/store/${id}`, false, {
    cache: "no-store",
  });
};

export const fetchAllStores = async () => {
  return await serverFetch(`store/fetch-all-stores`, false, {
    cache: "no-store",
  });
};

export const fetchAllMainCategory = async () => {
  return await serverFetch(`category/main`, false, {
    cache: "no-store",
  });
};

export const searchStoreByProductName  = async (searchTerm:string) => {
  try {
    const res = await clientFetch(`store/search-stores?searchTerm=${searchTerm}`)
    return res;
  } catch (error) {
    console.log(error)
  }
}