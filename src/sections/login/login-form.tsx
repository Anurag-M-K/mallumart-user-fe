// inside of src/app/RegistrationForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { schema, schemaType } from "@/schemas/login-form";

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
import { signIn } from "@/data/authentication";
import { useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import { Spinner } from "flowbite-react";

// ----------------------------------------------------------------------------------------

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, user } = useAuth();

  const form = useForm<schemaType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const {
    formState: { isValid, errors, dirtyFields },
  } = form;

  console.log("errors ",errors)

  const onSubmit = async (data: schemaType) => {
    setLoading(true);
    const res: any = await signIn(data.identifier, data.password);
    login(res);
    if (res?.statusText === "ok") {
      localStorage.setItem("accessToken", res.token);
      router.push("/");
    } else if (res?.login === false) {
      setLoading(false);
      setError(res.message);
    }
  };

  return (
    <FormProvider onSubmit={onSubmit} form={form}>
      <Card className="w-full shadow-md max-w-md p-6 space-y-4">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          {/* <CardDescription>Enter your credentials.</CardDescription> */}
        </CardHeader>
        <CardContent className="space-t-4">
          <div className="grid gap-2">
            <RHFTextField label="Email or Phone" type="text" name="identifier" />
          </div>
          <div className="grid ">
        
            <RHFTextField label="Password" name="password" type="password" />
          </div>
          <Link
            className="font-medium text-blue-500 text-primary-600 text-[13px] hover:underline dark:text-primary-500"
            href={"/auth/forget-password"}
            >
            Forgot password?
          </Link>
        </CardContent>
        {error !== "" && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}
        <CardFooter className="flex flex-col">

         
          <Button type="submit" className="w-full">
            {loading ? <Spinner /> : "Login"}
          </Button>
       
          <p className="text-sm mt-2 font-light text-gray-500 dark:text-gray-400">
            Dont have an account ?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};
