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
      email: "",
      password: "",
    },
  });

  const {
    formState: { isValid, errors, dirtyFields },
  } = form;

  const onSubmit = async (data: schemaType) => {
    setLoading(true);
    const res: any = await signIn(data.email, data.password);
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
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <RHFTextField label="Email" type="text" name="email" />
          </div>
          <div className="grid gap-2">
            <RHFTextField label="Password" name="password" type="password" />
          </div>
        </CardContent>
        {error !== "" && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full">
            {loading ? <Spinner/> : "Login"}
          </Button>
          {/* <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create an account
          </button> */}
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
