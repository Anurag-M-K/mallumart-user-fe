// inside of src/app/RegistrationForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormProvider, {
  RHFTextField,
  RHFOTPField,
} from "@/components/hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, verifyPhoneAndSendingOtp } from "@/data/authentication";
import { useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import { Spinner } from "flowbite-react";
import { schema, schemaType } from "@/schemas/newPassword-form";
import { updatePassword } from "@/data/profile";
import { toast } from "@/components/ui/use-toast";
import { CheckIcon } from "lucide-react";

// ----------------------------------------------------------------------------------------
const page = () => {
  const router = useRouter();
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, user } = useAuth();
  const token = localStorage.getItem("password-reset-token");
  const form = useForm<schemaType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isValid, errors, dirtyFields },
  } = form;

  const onSubmit = async (data: schemaType) => {
    try {
      setLoading(true);
      const res = await updatePassword(token, data.confirmPassword);
      if (res?.updated) {
        router.push(`/auth/login`);
        toast({
          variant: "default",
          description: (
            <div className="flex items-center">
              <CheckIcon color="green" className="mr-2" />
              <span className="first-letter:capitalize">
                Your Password updated.
              </span>
            </div>
          ),
          duration: 2000,
        })
      } else {
        setError(res.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="-translate-y-11 mt-10  flex min-h-screen mx-auto justify-center items-center">
      <FormProvider onSubmit={onSubmit} form={form}>
        <Card className="w-full shadow-md max-w-md p-6 space-y-4">
          <CardHeader>
            <CardTitle>Enter new password</CardTitle>
          </CardHeader>
          <CardContent className="space-t-4">
            <div className="grid gap-2">
              <RHFTextField
                label="New Password"
                name="newPassword"
                type="password"
              />
            </div>
            <div className="grid gap-2">
              <RHFTextField
                label="Re enter password"
                name="confirmPassword"
                type="password"
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
    </div>
  );
};

export default page;
