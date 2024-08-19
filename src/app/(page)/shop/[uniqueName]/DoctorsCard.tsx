"use client";

import { TDoctors } from "@/app/type";
import { toast } from "@/components/ui/use-toast";
import { drBooking } from "@/data/booking";
import { useMutation } from "@tanstack/react-query";
import { Button, Spinner } from "flowbite-react";
import { CheckIcon, CrossIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";

type TDoctorsProps = {
  doctors: TDoctors[];
};

export function DoctorsCard({ doctors }: TDoctorsProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const token: string = userData?.token;
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    const user: any = localStorage.getItem("user");
    setUserData(JSON.parse(user));
  }, []);

  const mutation = useMutation({
    mutationFn: (doctorId: string) => drBooking(doctorId, token, userData),
    onSuccess: (data: any) => {
      if (data?.error) {
        toast({
          variant: "default",
          description: (
            <div className="flex items-center">
              <XIcon color="red" className="mr-2" />
              <span className="first-letter:capitalize">{data?.message}</span>
            </div>
          ),
          duration: 4000,
        });
      } else {
        toast({
          variant: "default",
          description: (
            <div className="flex items-center">
              <CheckIcon color="green" className="mr-2" />
              <span className="first-letter:capitalize">{data?.message}</span>
            </div>
          ),
          duration: 8000,
        });
      }
    },
    onError: () => {
      toast({
        variant: "default",
        description: (
          <div className="flex items-center">
            <CrossIcon color="red" className="mr-2" />
            <span className="first-letter:capitalize">
              Something went wrong
            </span>
          </div>
        ),
        duration: 2000,
      });
    },
  });

  const handleDialogTriggerClick = async (index: number, doctorId: string) => {
    if (!userData) {
      setLoadingStates((prevState) => ({
        ...prevState,
        [index]: true,
      }));
      router.push("/auth/login");
    } else {
      setLoadingStates((prevState) => ({
        ...prevState,
        [index]: true,
      }));
      Swal.fire({
        icon: "warning" as SweetAlertIcon, // Ensure this is correctly typed
        title: "Confirm your appointment",
        text: "Click ok to continue",
        showCancelButton: true,
        padding: "2em",
        customClass: {
          popup: "sweet-alerts", // Correct usage of customClass
        },
      }).then(async (result) => {
        console.log("result ", result);
        if (result.value) {
          mutation.mutate(doctorId, {
            onSettled: () => {
              setLoadingStates((prevState) => ({
                ...prevState,
                [index]: false,
              }));
            },
          });
        } else {
          setLoadingStates((prevState) => ({
            ...prevState,
            [index]: false,
          }));
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-1 md:grid-cols-2 gap-x-5 my-5">
      {doctors?.map((item, key) => (
        <div
          key={key}
          className="bg-white border shadow-md w-full rounded-lg overflow-hidden flex flex-row"
        >
          <div className="border-r flex px-2 justify-center items-center sm:w-1/6 ">
            <img
              className="w-16 h-16 object-cover  rounded-full "
              alt="Doctor image"
              src={`${process.env.NEXT_PUBLIC_S3_STORAGE_BASE_URL}/${item?.imageUrl}`}
            />
          </div>
          <div className="p-2 w-5/6 sm:w-3/6 border-r flex flex-col items-start justify-start">
            <h5 className="sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item?.name}
            </h5>
            <p className="text-[14px] text-violet-800 mt-1 dark:text-gray-400">
              {item?.specialisationDetails?.name}
            </p>
            <p className="mt-1 rounded-lg text-[14px] text-gray-600 dark:text-gray-400">
              Available Time: {item?.availableTime}
            </p>
            <button
              onClick={() => handleDialogTriggerClick(key, item?._id)}
              className=" sm:hidden text-[12px] font-medium text-blue-600 rounded-md "
            >
              {loadingStates[key] ? <Spinner /> : "BOOK NOW"}
            </button>
          </div>
          <div className="sm:w-2/6 hidden  p-4 sm:flex flex-col items-center justify-center">
            <button
              onClick={() => handleDialogTriggerClick(key, item?._id)}
              className="bg-blue-700 text-white rounded-md px-2 py-1 hover:bg-blue-600"
            >
              {"BOOK NOW"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
