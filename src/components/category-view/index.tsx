/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8iFvygiX6bN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useMemo } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CategoryView() {
  const categories = [
    { id: 1, name: "Clothing", image: "/placeholder.svg" },
    { id: 2, name: "Electronics", image: "/placeholder.svg" },
    { id: 3, name: "Home & Garden", image: "/placeholder.svg" },
    { id: 4, name: "Beauty & Personal Care", image: "/placeholder.svg" },
    { id: 5, name: "Sports & Outdoors", image: "/placeholder.svg" },
    { id: 6, name: "Toys & Games", image: "/placeholder.svg" },
  ];
  const products = [
    {
      id: 1,
      name: "Casual T-Shirt",
      description: "Comfortable and stylish cotton t-shirt",
      price: 19.99,
      image: "/placeholder.svg",
      category: "Clothing",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "High-quality Bluetooth headphones with noise cancellation",
      price: 99.99,
      image: "/placeholder.svg",
      category: "Electronics",
    },
    {
      id: 3,
      name: "Outdoor Camping Tent",
      description: "Durable and waterproof tent for your next adventure",
      price: 79.99,
      image: "/placeholder.svg",
      category: "Sports & Outdoors",
    },
    {
      id: 4,
      name: "Makeup Palette",
      description: "Versatile eyeshadow palette with a variety of colors",
      price: 39.99,
      image: "/placeholder.svg",
      category: "Beauty & Personal Care",
    },
    {
      id: 5,
      name: "Smart Home Assistant",
      description: "Voice-controlled smart home device with various features",
      price: 59.99,
      image: "/placeholder.svg",
      category: "Electronics",
    },
    {
      id: 6,
      name: "Wooden Bookshelf",
      description: "Sturdy and stylish bookshelf for your home library",
      price: 149.99,
      image: "/placeholder.svg",
      category: "Home & Garden",
    },
    {
      id: 7,
      name: "Plush Teddy Bear",
      description: "Soft and cuddly teddy bear for children",
      price: 24.99,
      image: "/placeholder.svg",
      category: "Toys & Games",
    },
    {
      id: 8,
      name: "Hiking Backpack",
      description: "Durable and comfortable backpack for outdoor adventures",
      price: 59.99,
      image: "/placeholder.svg",
      category: "Sports & Outdoors",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    price: { min: 0, max: 500 },
    rating: 0,
  });
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        return (
          selectedCategory === null || product.category === selectedCategory
        );
      })
      .sort((a:any, b:any) => {
        switch (sortBy) {
          case "featured":
            return b.featured - a.featured;
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [selectedCategory, sortBy, filters]);
  return (
    <div className="w-full">
      <header className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-2xl font-bold">
            {selectedCategory ? selectedCategory : "All Categories"}
          </h1>
        </div>
      </header>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8 px-4 md:px-6">
        <div className="flex flex-col gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <MenuIcon className="w-4 h-4 mr-2" />
                Categories
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="md:static md:w-auto md:border-0 md:bg-transparent"
            >
              <div className="grid gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.name ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden"
            >
              <Link href="#" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold">${product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuIcon(props:any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
