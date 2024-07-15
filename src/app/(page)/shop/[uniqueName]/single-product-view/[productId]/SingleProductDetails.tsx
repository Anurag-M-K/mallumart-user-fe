"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { TProduct } from "@/app/type";
import { PiCurrencyInrBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/data/cart";
import { useAuth } from "@/utils/AuthContext";
import { useToast } from "@/components/ui/use-toast";

function SingleProductDetails({ product }: { product: TProduct }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [currentImage, setCurrentImage] = useState(product.images[0]);

  async function addToCartHandler() {
    if(!user) return router.push('/auth/login')
    await addToCart(product._id)
    toast({
      description: "Product added to cart.",
    })
  }
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-5  md:col-span-4">
            <img
              src={`${process.env.NEXT_PUBLIC_S3_STORAGE_BASE_URL}/${currentImage}`}
              alt="Product Image"
              width={800}
              height={800}
              className="sm:h-2/3 rounded-lg object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex flex-row w-screen md:w-auto  md:grid gap-4">
              {product.images.map((item) => (
                <button
                  key={item}
                  onClick={() => setCurrentImage(item)}
                  className="border rounded-lg overflow-hidden transition-colors hover:border-gray-900 dark:hover:border-gray-50"
                >
                  <img
                    src={item}
                    alt="Thumbnail 1"
                    width={100}
                    height={100}
                    className=" object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid ">
        <div>
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p>{product?.description}.</p>{" "}
          <div className="flex my-4 items-center">
            <PiCurrencyInrBold size={20} />
            <h2 className="text-xl font-bold">{product?.offerPrice}</h2>
            {product?.price && (
              <span className="flex items-center text-sm text-gray-500 hover:text-gray-100 line-through ml-2">
                <PiCurrencyInrBold size={14} />
                {product?.price}
              </span>
            )}
          </div>
        </div>
        <div className="text-sm leading-loose text-gray-500 dark:text-gray-400"></div>
        <div className="flex gap-x-2">
          <Button size="lg" onClick={addToCartHandler} className=" w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleProductDetails;
