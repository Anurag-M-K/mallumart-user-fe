"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Typography } from "../Typography/Typography";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuth } from "@/utils/AuthContext";
import { LogOutIcon } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/data/advertisement";
import { TCategories } from "@/app/type";
import Image from "next/image";
import { searchStoreByProductName } from "@/data/shops";
import { useState } from "react";
import { useStoreContext } from "@/utils/StoreContext";
import { useRouter } from "next/navigation";
import { IoMdMenu } from "react-icons/io";
import { ButtonGroup } from "flowbite-react";
import { BiCategory } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { MdOutlineManageAccounts } from "react-icons/md";
import { LiaStoreAltSolid } from "react-icons/lia";

export default function HeaderNew() {
  const { logout, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { dispatch } = useStoreContext();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const fetchingCategories = async () => {
    const response = await fetchCategories();
    const categories = response.json();
    return categories;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchingCategories(),
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await searchStoreByProductName(searchTerm);
      dispatch({ type: "SET_STORES", payload: res });
      dispatch({ type: "SET_IS_SEARCH", payload: true });
      // if(res)

      if (res.length > 0) {
        router.push(`/category?category=${res[0].category._id}`);
      } else {
        router.push(`/category?category`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className=" text-white">
      <div className="container  mx-auto flex items-center justify-between flex-wrap gap-4  px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            alt="lOGO"
            src={"/mallu-mart-logo.jpg"}
            width={80}
            height={80}
          />
        </Link>
        <Link
          rel="noopener noreferrer"
          href={"https://admin.mallumart.com/store/login"}
          target="_blank"
        >
          <Button className="flex items-center border-gray-600 border hover:bg-transparent  bg-transparent  text-sm rounded text-black  px-2 ">
            <LiaStoreAltSolid className="me-2" />
            Store Login
          </Button>
        </Link>
        {!user && (
          <div className="sm:hidden flex items-center gap-2">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-md  border px-4 py-2 text-sm font-medium transition-colors bg-[#0089d4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              prefetch={false}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center rounded-md  border px-4 py-2 text-sm font-medium transition-colors bg-[#0089d4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              prefetch={false}
            >
              Signup
            </Link>
          </div>
        )}
        {user && (
          <div className="md:hidden">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center">
                  <FaRegUserCircle
                    size={24}
                    className="text-gray-700 cursor-pointer"
                  />
                  <p className="text-black ms-2 cursor-pointer">{user?.name}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <p className="flex font-medium w-full items-center">
                    <span>{user?.name}</span>
                  </p>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/profile"}>
                    <div className="flex cursor-pointer w-full items-center">
                      <MdOutlineManageAccounts className="mr-2 h-4 w-4" />

                      <span>Account</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <div className="flex cursor-pointer w-full items-center">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span onClick={() => logout()}>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <div className="flex flex-row  gap-x-2 w-screen  max-w-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#0089d4] hover:bg-[#61acd4] flex items-center gap-x-2  md:w-auto">
                <BiCategory className="h-5 w-5 hover:white" />
                <span className="text-white">All</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full md:w-56">
              {data?.map((item: TCategories) => (
                <DropdownMenuItem key={item._id} className="w-full">
                  <Link
                    href={`/category?category=${item._id}`}
                    className="w-full text-black"
                  >
                    {item?.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <form className="w-full" onSubmit={handleOnSubmit}>
            <div className="relative w-full">
              <Input
                onChange={handleSearch}
                type="text"
                placeholder="Search products..."
                className="placeholder-white w-full text-gray-600 border-gray-700  rounded-md  py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button
                className="absolute right-5 top-1/2  -translate-y-1/2 h-4 w-4"
                type="submit"
              >
                <SearchIcon className="absolute text-gray-700 left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {!user && (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-md  border px-4 py-2 text-sm font-medium transition-colors bg-[#0089d4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                prefetch={false}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-md  border px-4 py-2 text-sm font-medium transition-colors bg-[#0089d4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                prefetch={false}
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {user && (
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center">
                  <FaRegUserCircle
                    size={24}
                    className="text-gray-700 cursor-pointer"
                  />
                  <p className="text-black ms-2 cursor-pointer">{user?.name}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <p className="flex font-medium w-full items-center">
                    <span>{user?.name}</span>
                  </p>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/profile"}>
                    <div className="flex cursor-pointer w-full items-center">
                      <MdOutlineManageAccounts className="mr-2 h-4 w-4" />

                      <span>Account</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <div className="flex cursor-pointer w-full items-center">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span onClick={() => logout()}>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}

function FacebookIcon(props: any) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function HeartIcon(props: any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function InboxIcon(props: any) {
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
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function InstagramIcon(props: any) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function MenuIcon(props: any) {
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

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TwitterIcon(props: any) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
