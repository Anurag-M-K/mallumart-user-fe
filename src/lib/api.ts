import { GetServerSidePropsContext } from "next";
import { cache } from "react";

export const noAuthFetch = async (
  url: string,
  options: any
): Promise<Response> => {
  return fetch(url, options);
};

export const serverFetch = async (
  url: string,
  isAuthenticated: boolean,
  options: any
): Promise<Response> => {


  const finalUrl = `${process.env.NEXT_PUBLIC_SELF_URL}/api/${url}`;
  const allOptions: any = {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": options.headers?.["Content-Type"] ?? "application/json",
    },
  };

  try {
    const response = await fetch(finalUrl, allOptions);
    if (!response.ok) {
    console.log(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};

export const clientFetch = async (
  url: string,
  // isAuthenticated: boolean,
  options: any = {}
) => {
  const finalUrl = `${process.env.NEXT_PUBLIC_SELF_URL}/api/${url}`;
  const allOptions = {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": options.contentType ?? "application/json",
    },
    next: options.cache
      ? undefined
      : {
        // revalidate: 10,
        cache:"no-store"
      },
  };

  if (options.contentType === "multipart/form-data") {
    delete allOptions.headers["Content-Type"];
  }

  if (
    options.method !== "GET" &&
    options.contentType !== "multipart/form-data"
  ) {
    allOptions.body = JSON.stringify(options.body);
  }

  // do it later if needed
  // if (isAuthenticated) {
  //   allOptions.headers.Authorization = `Bearer ${await getClientAccessToken()}`;
  // }
  console.log("alloptions ",allOptions)
  const response = await fetch(finalUrl, allOptions);
  // if (!response.ok) {
  //   if (
  //     isAuthenticated &&
  //     response.status === 401 &&
  //     url !== "customer/user/"
  //   ) {
  //     window.location.href = "/auth/logout";
  //   }
  // }
  const data = await response.json()
  return data;
  // return new Promise((resolve, reject) => {
  //   resolve(response);
  // });
};
