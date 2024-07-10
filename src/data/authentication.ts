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

export const otpVerify = async (phone:string, otp: any) => {
  try {
    const res = await clientFetch(`user/verify-otp`, {
      method: "POST",
      body: { phone, otp },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (username: any, password: string) => {
  try {
    const res = await clientFetch(`user/login`, {
      method: "POST",
      body: { username, password },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const verifyPhoneAndSendingOtp = async (phone: string) => {

  try {
    const res = await clientFetch(`user/forget-password`, {
      method: "POST",
      body: {phone},
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const otpVerifyForPasswordReset = async (token:string| null, otp: any) => {
  try {
    const res = await clientFetch(`user/verify-otp-for-password-reset`, {
      method: "POST",
      body: { token, otp },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const changePassword = async (token:string|null, password: string) => {
  try {
    const res = await clientFetch(`user/change-password`, {
      method: "POST",
      body: { token, password },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};