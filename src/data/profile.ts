import { clientFetch } from "@/lib/api"

export const profileUpdate = async (values: any, token: string) => {
    try {
      const res = await clientFetch(`user/update-profile`, {
        method: "PUT",
        body: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };