"use client";
import { THashMap } from "@/app/type";
import Link from "next/link";
import { ReactNode } from "react";

const LabelsLinks: THashMap = {
  "Terms of Use": "/policy/terms-of-use",
  "Privacy Policy": "/policy/privacy-policy",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="text-lg font-semibold text-center mt-5">
        Policy at Mallu Mart
      </div>
      <div className="flex justify-around">
        {Object.keys(LabelsLinks).map((key: string) => (
          <div
            key={key}
            className="text-green-800 underline underline-offset-2"
          >
            <Link href={LabelsLinks[key]}> {key}</Link>
          </div>
        ))}
      </div>
      <hr className="my-4" />
      <div className="mt-4 w-4/5 mx-auto">{children}</div>
    </>
  );
};

export default Layout;
