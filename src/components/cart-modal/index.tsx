/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8VR7TSLWojZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";

import placeholder from "/public/placeholder.svg";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCartByStoreId, removeCartByStoreId } from "@/data/cart";

export default function CartModal({
  storeId,
  storeWhatsapp,
}: {
  storeId: string;
  storeWhatsapp: any;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [cart, setCart] = useState<
    {
      productId: {
        _id: string;
        name: string;
        images: string[];
        description: string;
        price: number;
        offerPrice: number;
        category: string;
        isActive: boolean;
        isPending: boolean;
        store: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      quantity: number;
      _id: string;
    }[]
  >([]);

  const { data, isPending } = useQuery({
    queryKey: ["cart", storeId],
    queryFn: () => fetchCartByStoreId(storeId),
  });

  useEffect(() => {
    if (!isPending && data) {
      setCart(data);
    }
  }, [data, isPending]);

  const handleQuantityChange = (id: any, quantity: any) => {
    setCart(
      cart.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: any) => {
    setCart(cart.filter((item) => item._id !== id));
  };
  const handleBuyNow = async () => {
    const cartItems = cart
      .map((item) => `*${item.productId.name}* - Quantity: ${item.quantity}`)
      .join("\n");
    const total = cart.reduce(
      (acc, item) =>
        acc +
        (item.productId.offerPrice ?? item.productId.price) * item.quantity,
      0
    );
    const message = `Hello, I would like to order following products:\n\n${cartItems}\n\nTotal: ₹${total.toFixed(
      2
    )}`;
    window.open(
      `https://wa.me/${storeWhatsapp}?text=${encodeURIComponent(message)}`
    );

    await removeCartByStoreId(storeId);
  };
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          if (!user) router.push("/auth/login");
        }}
        asChild
      >
        <Button size="lg" variant="outline" className="bg-blue-600 w-full sm:w-auto text-white">
          <ShoppingCartIcon className="w-4 h-4 mr-2" />
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>
            Review and adjust your cart items before checkout.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {cart.length > 0 ? (
            <div className="grid gap-4">
              {cart.map((item, index) => (
                <Card
                  key={item._id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_STORAGE_BASE_URL}/${item?.productId?.images[0]}`}
                    alt="product image"
                    width={80}
                    height={80}
                    className="w-20 h-20 overflow-hidden object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="grid gap-1">
                    <h3 className="font-medium">{item?.productId?.name}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {(item?.productId?.offerPrice || item?.productId?.price) ? (
                        <>
                          &#x20b9;
                          {item?.productId?.offerPrice
                            ? item?.productId?.offerPrice.toFixed(2)
                            : item?.productId?.price.toFixed(2)}
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handleQuantityChange(item?._id, item?.quantity - 1)
                      }
                      disabled={item?.quantity === 1}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                    <div className="font-medium">{item?.quantity}</div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handleQuantityChange(item?._id, item?.quantity + 1)
                      }
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveItem(item?._id)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">
                No products available
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
