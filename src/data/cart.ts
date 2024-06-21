import { clientFetch } from "@/lib/api";

export const addToCart = async (productId: string, quantity: number = 1) => {
  let token = localStorage.getItem("accessToken");

  try {
    const res = await clientFetch("user/cart", {
      method: "POST",
      body: { productId, quantity },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("helloworld");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCartByStoreId = async (shopId: string) => {
  let token = localStorage.getItem("accessToken");
  return await clientFetch(`user/cart/${shopId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCartByStoreId = async (shopId: string) => {
  let token = localStorage.getItem("accessToken");
  return await clientFetch(`user/cart/${shopId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};