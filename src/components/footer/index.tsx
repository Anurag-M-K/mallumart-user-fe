'use client';
import { TCategories } from "@/app/type";
import { fetchCategories } from "@/data/advertisement";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaRegAddressCard } from "react-icons/fa";

export default function Footer() {
  const fetchingCategories = async () => {
    const response = await fetchCategories();
    const categories = response.json();
    return categories;
  };
  

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchingCategories(),
  });

  const filteredCategories = data?.filter((item:TCategories)=>item?.isShowOnHomePage === true).slice(0,5)
  return (
    <footer className="bg-[#0077b6] text-white py-12 dark:bg-gray-800">
      <div className="container max-w-[1380px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="grid gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Mallu Store</span>
          </Link>
          <p className="text-white dark:text-gray-400">
            Discover the best products from top vendors in our vibrant
            marketplace.
          </p>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-white dark:text-gray-400" />
              <p className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                +91 9747411113
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-white dark:text-gray-400" />
              <p className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                Mallumartindia@gmail.com
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaRegAddressCard color="" className="h-4 w-4  text-white dark:text-gray-400" />
              <div className="">

              <p className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              2nd floor, Hayle complex,
              </p>
              <p className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              puthiyatheru, kannur, kerala, 670011
              </p>
              </div>
              
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <ul className="grid gap-1">
            <li>
              <Link
                href="/policy/terms-of-use"
                className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                Terms of Use
              </Link>
            </li>
            <li>
              <Link
                href="/policy/privacy-policy"
                className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                Privacy Policy
              </Link>
            </li>
            {/* <li>
              <Link
                href="#"
                className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                FAQs
              </Link>
            </li> */}
            <li>
              <Link
                href="/help/contact-us"
                className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Popular Categories</h3>
          <ul className="grid gap-1">
      {filteredCategories?.map((item:TCategories)=>(
              <li key={item._id}>
              <Link
                href={`/category/${item.name}`}
                className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
               {item.name}
              </Link>
            </li>
      ))}
          
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex items-center gap-2">
            <Link
              href="#"
              className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
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

function LinkedinIcon(props: any) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon(props: any) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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

function PhoneIcon(props: any) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
