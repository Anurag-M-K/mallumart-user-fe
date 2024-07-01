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

export const fetchStoreByUniqueName = async (uniqueName:string) =>{
    return await serverFetch(`store/${uniqueName}`,false, {
        cache:"no-store"
    })
}