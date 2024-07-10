"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { schema, schemaType } from "@/schemas/registration-form";
import { Button } from "@/components/ui/button";
import FormProvider, { RHFTextField, RHFOTPField } from "@/components/hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/Typography/Typography";
import Link from "next/link";
import { otpVerify, register } from "@/data/authentication";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";

export const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<any>("");

  const form = useForm<schemaType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: null,
      phone: 0,
      password: "",
    },
  });

  const {
    formState: { isValid, errors, dirtyFields },
  } = form;

  const sendOtp = async () => {
    const { phone, email, fullName, password } = form.getValues(); // Destructure values from form

    // Remove email from data if it's an empty string
    const userData = {
      fullName,
      password,
      phone,
      ...(email && { email }), // Include email only if it exists
    };
    try {
     const res =  await register(userData);
     if(res?.otpSend){
      router.push(`/auth/${phone}`)
     }else{
      setError(res?.message || `Failed to register`)
      setLoading(false)
     }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError('An error occurred while sending OTP.');
    setLoading(false);  // Stop loading on error
    }
  };

  const onSubmit = async (data: schemaType) => {
    try {
      setLoading(true);
     const res:any =  await sendOtp(); 
     
      // setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error while submiting ",error);
    }
  };

  return (
    <FormProvider onSubmit={form.handleSubmit(onSubmit)} form={form}>
      <Card className="w-full shadow-md max-w-md p-6 space-y-4">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          {/* <CardDescription>Enter your information to get started.</CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <RHFTextField label="Full Name" name="fullName" type="text" />
          </div>
          <div className="grid gap-2">
            <RHFTextField label="Email" name="email" type="email" />
          </div>
          <div className="grid gap-2">
            <RHFTextField label="Password" name="password" type="password" />
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Typography variant="span" className="!font-medium">Phone</Typography>
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          className="pr-28 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...field}
                          type={"number"}
                          placeholder=""
                          value={field.value === 0 ? "" : field.value}
                          onChange={(event) => {
                            field.onChange(Number(event.target.value));
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
        {error !== "" && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full">
            {loading ? <Spinner/> :  "Create Account"}
          </Button>
          <p className="text-sm font-light mt-3 text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};
