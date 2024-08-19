import { serverFetch } from "@/lib/api";

export const fetchAllDoctors = async (uniqueName:string) => {
    return await serverFetch(`user/doctors/${uniqueName}`, false, {
      cache: "no-store",
    });
  };
  
  export const  fetchAllSpecialisations = async(uniqueName:string) => {
    return serverFetch(`user/specialisations/${uniqueName}`,false, {
      cache:"no-store"
    })
  }