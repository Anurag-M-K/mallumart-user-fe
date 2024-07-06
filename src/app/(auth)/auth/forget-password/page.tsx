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
import { schema, schemaType } from "@/schemas/forget-password-phone-form";

// ----------------------------------------------------------------------------------------
const page = () => {
  const router = useRouter();
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, user } = useAuth();

  const form = useForm<schemaType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
    },
  });

  const {
    formState: { isValid, errors, dirtyFields },
  } = form;

  const onSubmit = async (data: schemaType) => {
    setLoading(true);
    const res: any = await verifyPhoneAndSendingOtp(data?.phone);
    localStorage.setItem("password-reset-token", res?.token);
    if (res?.otpSend) {
      router.push(`/auth/forget-password/${res?.token}`);
    } else {
      setError(res?.message);
    }
    setLoading(false);
  };

  return (
    <div className="-translate-y-11 mt-10  flex min-h-screen mx-auto justify-center items-center">
      <FormProvider onSubmit={onSubmit} form={form}>
        <Card className="w-full shadow-md max-w-md p-6 space-y-4">
          <CardHeader>
            <CardTitle>Enter your phone number</CardTitle>
          </CardHeader>
          <CardContent className="space-t-4">
            <div className="grid gap-2">
              <RHFTextField label="Phone" name="phone" type="text" />
            </div>
          </CardContent>
          {error !== "" && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">
              {loading ? <Spinner /> : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </FormProvider>
    </div>
  );
};

export default page;
