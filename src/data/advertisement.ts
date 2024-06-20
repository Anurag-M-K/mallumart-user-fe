import { serverFetch } from "@/lib/api"

export const fetchAdvertisements = async () => {
    return await serverFetch(`advertisement`,false,{
        cache:"no-store"
    })
}

export const fetchCategories = async (top?:boolean) => {
    return await serverFetch(`category?top=${top}`,false,{
        cache:"no-store"
    })
}

export const fetchStoreById = async (id:string) =>{
    return await serverFetch(`store/${id}`,false, {
        cache:"no-store"
    })
}