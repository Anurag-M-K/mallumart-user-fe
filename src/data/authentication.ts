import { clientFetch } from "@/lib/api";

export const register = async (values: any) => {
  try {
    const res = await clientFetch(`user/register`, {
      method: "POST",
      body: values,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const otpVerify = async (email: string, otp: any) => {
  try {
    const res = await clientFetch(`user/verify-otp`, {
      method: "POST",
      body: { email, otp },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const res = await clientFetch(`user/login`, {
      method: "POST",
      body: { email, password },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
