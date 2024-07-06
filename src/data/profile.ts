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
export const changePassword = async ( token: string,values: any) => {
    try {
      const res = await clientFetch(`user/change-profile-password`, {
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
export const updatePassword = async (token: any, newPassword: string) => {
    try {
      const res = await clientFetch(`user/update-password`, {
        method: "PUT",
        body: {token,newPassword},
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };