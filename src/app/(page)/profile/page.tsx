"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/utils/AuthContext";
import FormProvider from "@/components/hook-form/form-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, schemaType } from "@/schemas/profile-form";
import { RHFTextField } from "@/components/hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "flowbite-react";
import { TUser } from "@/app/type";
import { profileUpdate } from "@/data/profile";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon } from "lucide-react";
import { RiLockPasswordFill } from "react-icons/ri";
import UpdatePassword from "./UpdatePassword";
import { FaRegUser } from "react-icons/fa";


export default function Component() {
  const { user, setUser } = useAuth();
  const [loading, isLoading] = useState<boolean>();
  const [error, setError] = useState<any>("");
  const [ passwordForm, setPasswordForm] = useState(false)
  const { toast } = useToast();

  const form = useForm<schemaType>({
    mode: "onChange",
    // resolver: zodResolver(schema),
    // defaultValues: {
    //   email: "",
    //   phone:"",
    //   name:"",
    // },
  });

  const {
    formState: { isValid, errors, dirtyFields },
  } = form;
  const onSubmit = async (values: TUser) => {
    try {
      if (values?.email || values?.fullName) {
        isLoading(true);
        const res = await profileUpdate(values, user?.token);
        if (res) {
          setUser((pre: TUser) => ({
            ...pre,
            name: res?.fullName,
            email: res?.email,
            token: user?.token,
          }));
          toast({
            variant: "default",
            description: (
              <div className="flex items-center">
                <CheckIcon color="green" className="mr-2" />
                <span className="first-letter:capitalize">
                  Your profile has been updated successfully.
                </span>
              </div>
            ),
            duration: 2000,
          });
        }
        isLoading(false);
      }
    } catch (error) {
      isLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-3xl py-8">
      <div className="flex justify-center flex-col md:flex-row  sm:items-start md:items-center gap-6">
        <div className="flex justify-center sm:justify-start">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-primary">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className=" grid gap-2">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl text-center font-bold">{user?.name}</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" />
              <span>+91 {user?.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="w-5 h-5" />
              <span>{user?.email}</span>
            </div>
            <div onClick={()=>setPasswordForm(!passwordForm)} className="flex cursor-pointer items-center gap-2">
             {!passwordForm ?  ( 
              <>
               <RiLockPasswordFill  className="w-5 h-5" />
               <span>Update password</span>
              </>
             ) : (
              <>
              <FaRegUser  className="w-5 h-5" />
              <span>Account Info</span>
             </>
             )}
             
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <div className=" w-full ">
        {passwordForm ? 
        <UpdatePassword/> : (

        <FormProvider onSubmit={onSubmit} form={form}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-1">
                <RHFTextField
                  label="Name"
                  placeholder={user?.name}
                  type="text"
                  name="fullName"
                />
              </div>
              <div className="grid gap-1">
                {/* <Label htmlFor="email">Email</Label> */}
                <RHFTextField
                  label="Email"
                  type="text"
                  placeholder={user?.email}
                  name="email"
                />
              </div>
              <div className="grid gap-1">
                <RHFTextField
                  disabled
                  placeholder={user?.phone}
                  label="Phone"
                  type="text"
                  name="phone"
                />
              </div>
            </CardContent>
            {error !== "" && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full">
                {loading ? <Spinner /> : "Update"}
              </Button>
            </CardFooter>
          </Card>
        </FormProvider>
        )}
      </div>
    </div>
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
