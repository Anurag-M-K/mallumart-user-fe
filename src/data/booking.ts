import { clientFetch } from "@/lib/api";
import { headers } from "next/headers";

export const fetchTimeSlots = async (storeId:string,token:string) => {
    if (!storeId) {
      return [];
    }

    if(!token) return[]

    try {
      const res = await clientFetch(
        `user/time-slots/${storeId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const slotBooking = async(slotData:any,token:string,storeId:string) => {
    try {
      const res = await clientFetch(
        `user/booking`,{
          method:"POST",
          headers:{
            Authorization:`Bearer ${token}`
          },
          body:{slotId:slotData.slotId,date:slotData?.date,startTime:slotData?.startTime,endTime:slotData?.endTime,storeId:storeId}
        }
      )
      return res;
    } catch (error) {
      console.log(error)
    }
  }