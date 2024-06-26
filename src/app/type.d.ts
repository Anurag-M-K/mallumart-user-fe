import { StringValidation } from "zod";

type TAdvertisement = {
  _id: string;
  image: string;
  advertisementDisplayStatus: string;
};

type TCategories = {
  _id: string;
  name: string;
  isActive: boolean;
  isShowOnHomePage: boolean;
  icon: string;
  subcategories: [];
};

type TCurrentLocation = {
  longitude: number;
  latitude: number;
};

type TProductCategories = {
  [x: string]: any;
  _id: any;
  name: string;
  parentId?: any;
  isActive: boolean;
  isPending: boolean;
  isShowOnHomePage: boolean;
  icon: string;
};
type TShop = {
  store: {
    location: {
      type: string;
      coordinates: [number, number];
    };
    _id: string;
    storeName: string;
    uniqueName: string;
    storeOwnerName: string;
    address: string;
    phone: string;
    email: string;
    shopImgUrl: string;
    subscriptinPlan: "basic" | "premium" | "noPlanTaken";
    wholeSale: boolean;
    status: "active" | "inactive";
    live: "temporarilyClosed" | "permenantlyClosed" | "open";
    category: {
      name: string;
      _id: string;
    };
    district: string;
    addedProducts: any; //add here type
    createdAt: string;
    bio: string;
  };
  productCategories?: TProductCategories;
};

type TFilters = {
  category?:string;
  sort?:string;
  search?:string;
}

type TProduct = {
  _id:string;
  name:string;
  images:string[];
  description:string;
  price:number;
  offerPrice:number;
  category:TProductCategories;
  isActive:boolean;
  isPending:boolean;
}

type TStore = {
  location: {
    type: string;
    coordinates: [number, number];
  };
  _id: string;
  storeName: string;
  uniqueName: string;
  message?:string;
  storeOwnerName: string;
  address: string;
  phone: string;
  email: string;
  shopImgUrl: string;
  subscriptinPlan: "basic" | "premium" | "noPlanTaken";
  wholeSale: boolean;
  retail:boolean;
  status: "active" | "inactive";
  live: "temporarilyClosed" | "permenantlyClosed" | "open";
  category: {
    name: string;
    _id: string;
  };
  district: string;
  addedProducts: any; //add here type
  createdAt: string;
  bio: string;
productCategories?: TProductCategories;
};
type THashMap = {
  [key: string]: any;
};
