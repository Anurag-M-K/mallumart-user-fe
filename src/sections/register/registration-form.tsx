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

export const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const form = useForm<schemaType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: 0,
      password: "",
      otp: "",
    },
  });

  const {
    formState: { isValid, errors, dirtyFields },
  } = form;

  const sendOtp = async () => {
    const phone = form.getValues("phone");
    const email = form.getValues("email");
    const fullName = form.getValues("fullName");
    const password = form.getValues("password");
    try {
     const res =  await register({ phone, email, fullName, password });
     console.log("res ",res)
    //  if(res.status===201){
      router.push("/auth/login")
    //  }
      // setOtpSent(true);
      // setEmail(email);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const onSubmit = async (data: schemaType) => {
    try {
      setLoading(true);
      console.log("Data", data);
     const res =  await sendOtp();  // Ensure sendOtp is awaited
     console.log("res ",res)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <FormProvider onSubmit={form.handleSubmit(onSubmit)} form={form}>
      <Card className="w-full max-w-md p-6 space-y-4">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Enter your information to get started.</CardDescription>
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
          {/* {otpSent && (
            <div className="grid gap-2">
              <RHFOTPField
                name="otp"
                label="One-Time Password"
                helperText="Please enter the one-time password sent to your number"
              />
            </div>
          )} */}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full">
            {loading ? "Saving..." : "Create Account"}
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
