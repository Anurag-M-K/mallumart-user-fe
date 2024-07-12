import React from "react";
import { FaRegAddressCard } from "react-icons/fa";

function page() {
  return (
    <div className="sm:px-44 ">
      <div className=" min-w-44">
        <div className="textTop p-5">
          <h2 className="text-2xl font-bold text-center my-2">Contact Us</h2>
          <p className="text-center">
            Get in touch with our team for any inquiries or support.
          </p>
        </div>
        <div className=" py-8 w-auto flex-col gap-y-4 flex items-center justify-center">
          <div className="flex gap-x-2 items-center">
            <FaRegAddressCard className="hidden sm:flex" size={25} />
            <p className="text-center">
              2nd floor, Hayle complex, puthiyatheru, kannur, kerala, 670011
            </p>
          </div>
          <div className="flex gap-x-2 items-center">
            <MailIcon />
            <p>Mallumartindia@gmail.com</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <PhoneIcon />
            <p>+91 9747411113</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

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
