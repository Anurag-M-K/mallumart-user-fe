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
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter()
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
    const fullName = form.getValues("fullName")
    const password = form.getValues("password")
    try {
      await register({ phone, email , fullName, password });
      setOtpSent(true);
      setEmail(email);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOtp = async (data: schemaType) => {
    try {
      const otp = form.getValues("otp");
      console.log("otp beofre ",otp)

      const result:any = await otpVerify(email,otp)

      if (result.statusText === "ok") {
        router.push("/auth/login")
        // Handle post-verification logic here
      } else {
        console.error("OTP verification failed:", result);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const onSubmit = async (data: schemaType) => {
    if (!otpSent) {
      sendOtp();
    } else {
      verifyOtp(data);
    }
  };

  return (
    <FormProvider onSubmit={onSubmit} form={form}>
      <Card className="w-full max-w-md p-6  space-y-4">
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
                          className="pr-28 [appearance:textfield] [&::-webkit-outer-spin-butto-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...field}
                          type={"number"}
                          placeholder=""
                          value={field.value === 0 ? "" : field.value}
                          onChange={(event) => {
                            field.onChange(Number(event.target.value));
                          }}
                        />
                      </FormControl>
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        disabled={!Boolean(dirtyFields.phone) || Boolean(errors.phone?.message)}
                        className="absolute cursor-pointer h-10 rounded-l-none top-0 right-0 active:bg-black"
                        onClick={sendOtp}
                      >
                        Send OTP
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {otpSent && (
            <div className="grid gap-2">
              <RHFOTPField
                name="otp"
                label="One-Time Password"
                helperText="Please enter the one-time password sent to your number"
              />
            </div>
          )}
          {/* <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-500 dark:text-gray-300">
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div> */}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full">
            {otpSent ? "Verify OTP" : "Create Account"}
          </Button>
          <p className="text-sm font-light mt-3 text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium  text-primary-600 hover:underline dark:text-primary-500">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};
