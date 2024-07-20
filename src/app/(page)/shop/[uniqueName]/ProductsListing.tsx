"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { TFilters, TProductCategories, TShop } from "@/app/type";
import { fetchProducts } from "@/data/shops";
import { PiCurrencyInrBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { addToCart } from "@/data/cart";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

function ProductsListing({ store }: { store: TShop }) {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<TFilters>({
    category: "",
    sort: "",
    search: "",
  });
  const [products, setProducts] = useState<any>([]); // Add proper type
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [whoelReponse, setWholeResponse] = useState<any>();
  const handleCategoryChange = (id: string) => {
    setFilters({ ...filters, category: id });
  };

  const { user } = useAuth();

  const router = useRouter();

  const { toast } = useToast();

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Low to high", value: "lowToHigh" },
    { label: "High to low", value: "highToLow" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setFilters({ ...filters, sort: value });
  };

  const storeId = store?.store?._id;

  const fetchProductsByFilteration = async () => {
    try {
      const res = await fetchProducts({ filters, storeId, page: currentPage });
      setProducts(res.products);
      setTotalPages(res.totalPages);
      setWholeResponse(res.totalProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsByFilteration();
  }, [filters, currentPage]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchTerm });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  async function addToCartHandler(productId: string) {
    if (!user) return router.push("/auth/login");
    await addToCart(productId);
    toast({
      description: "Product added to cart.",
    });
    await queryClient.invalidateQueries({
      queryKey: ["cart", store.store._id],
    });
  }
  console.log("product ", products);

  return (
    <div>
      <section className="py-2 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <div className="grid grid-cols-1 sm:flex items-center gap-4 w-full sm:w-auto">
              <form onSubmit={handleOnSubmit} action="">
                <div className="relative flex items-center sm:w-full">
                  <Input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="pl-8 w-full sm:w-full"
                  />
                  <button
                    type="submit"
                    className="absolute right-2.5 cursor-pointer"
                  >
                    <IoSearch size={24} color="gray" />
                  </button>
                </div>
              </form>
              <div className="flex items-center gap-4 relative z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FilterIcon className="w-4 h-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white z-50">
                    <DropdownMenuLabel className="pt-3 mx-3">
                      Filter by Subcategory
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {store?.productCategories?.map(
                      (item: TProductCategories) => (
                        <DropdownMenuCheckboxItem
                          onClick={() => handleCategoryChange(item._id)}
                          className="mx-3 hover:bg-gray-200 cursor-pointer"
                          key={item._id}
                        >
                          {item?.name}
                        </DropdownMenuCheckboxItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ListOrderedIcon className="w-4 h-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white z-50">
                    <DropdownMenuLabel className="mx-3 mt-2">
                      Sort by
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      className=""
                      defaultValue="featured"
                    >
                      {sortOptions?.map((item) => (
                        <DropdownMenuRadioItem
                          onClick={() => handleSortChange(item?.value)}
                          key={item?.value}
                          className="mx-3 hover:bg-gray-200 mt-3 cursor-pointer"
                          value={item?.value}
                        >
                          {item?.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
              {whoelReponse} products
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {products?.map((product: any) => (
              <div
                key={product?.id}
                className=" dark:bg-gray-950 rounded-lg shadow-sm hover:shadow-md transition-shadow justify-between border flex flex-col overflow-hidden"
              >
                <Link
                  href={`/shop/${store?.store?._id}/single-product-view/${product?._id}`}
                >
                  <div className=" sm:w-full h-44   sm:h-72 relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_STORAGE_BASE_URL}/${product?.images[0]}`}
                      alt={product?.name}
                      style={{ objectFit: "cover" }}
                      fill
                      // layout="contain"
                      // objectFit="contain"
                      // height={300}
                      // width={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      // className="hover:scale-105 object-cover sm:object-cover mt-2 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-2">
                  <h3 className="sm:text-lg font-semibold">{product?.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 ">
                    {product?.description?.length > 12
                      ? product?.description?.substring(0, 12) + "..."
                      : product?.description}
                  </p>
                  <div className="flex items-start flex-col sm:flex-row justify-between">
                    <span className="sm:text-lg flex items-start  font-semibold">
                      {+product.price !== 0 && (
                        <>
                          <PiCurrencyInrBold size={20} />
                          {+product?.offerPrice !== 0 ? (
                            <>
                              {product?.offerPrice}
                              <small className="text-red-500 ml-2">
                                <del>{product?.price}</del>
                              </small>
                            </>
                          ) : (
                            product?.price
                          )}
                        </>
                      )}
                    </span>
                    <div className="text-start">
                      <Button
                        size="sm"
                        onClick={() => addToCartHandler(product?._id)}
                        className=" text-white bg-blue-600 hover:bg-blue-700 sm:w-auto"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* pagination here */}
          <div className="mt-2 flex justify-center">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductsListing;

function FilterIcon(props: any) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props: any) {
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
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <line x1="4" y1="6" x2="4" y2="6" />
      <line x1="4" y1="12" x2="4" y2="12" />
      <line x1="4" y1="18" x2="4" y2="18" />
    </svg>
  );
}
