"use client";
import React, { useState } from "react";
import { DoctorsCard } from "./DoctorsCard";
import { TDoctors, TSpecialisation } from "@/app/type";
import { FcDepartment } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import Specialisations from "./Specialisations";

type THospitalServiceProps = {
  doctors: TDoctors[];
  specialisations: TSpecialisation[];
};

function HospitalService({ doctors, specialisations }: THospitalServiceProps) {
  const [selector, setSelector] = useState<"doctors" | "departments" | "">("");
  const availableDoctors: TDoctors[] = doctors?.filter(
    (item) => item.isAvailable === true
  );

  return (
    <div className=" lg:mx-28 rounded-lg  bg-white mb-12">
      <div className="border border-gray-300 shadow-lg  rounded-lg px-2 sm:px-5 ">
        <div
          className={`flex justify-between items-center m-5   ${
            selector !== "" && "border-b"
          } border-gray-400`}
        >
          <div className="flex ">
            <button
              onClick={() => setSelector("departments")}
              className={`gap-x-2 flex border-b p-2 ${
                selector === "departments" ? "border-blue-500" : ""
              } `}
            >
              <FcDepartment className="w-8  h-8 sm:w-12 sm:h-12"  />
              <div className="flex flex-col">
                <span className="text-start text-sm ">Departments</span>
                <span className="text-start text-sm ">
                  {specialisations?.length > 0
                    ? specialisations?.length + " Departments found"
                    : "No Departments found"}
                </span>
              </div>
            </button>
            <button
              onClick={() => setSelector("doctors")}
              className={`mx-2 gap-x-2 flex border-b p-2   ${
                selector === "doctors" ? "border-blue-500" : ""
              }`}
            >
              <FaUserDoctor className="text-blue-500 w-8  h-8 sm:w-12 sm:h-12"   />
              <div className="flex flex-col">
                <span className="text-start text-sm ">Doctors</span>
                <span className="text-start text-sm ">
                  {availableDoctors?.length > 0
                    ? availableDoctors?.length + " Doctors found"
                    : "No Doctors available"}{" "}
                </span>
              </div>
            </button>
          </div>
          {/* <div>
            <input className="border border-black" type="search" />
          </div> */}
        </div>

        {/* Specialisation here */}

        {selector === "departments" ? (
          <Specialisations specialisation={specialisations} />
        ) : selector === "doctors" ? (
          <DoctorsCard doctors={availableDoctors} />
        ) : null}
      </div>
    </div>
  );
}

export default HospitalService;
