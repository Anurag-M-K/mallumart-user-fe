import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { schema, schemaType } from "@/schemas/newPassword-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField } from "@/components/hook-form";
import { useAuth } from "@/utils/AuthContext";
import { changePassword } from "@/data/profile";
import { toast } from "@/components/ui/use-toast";
import { CheckIcon } from "lucide-react";
import { Spinner } from "flowbite-react";

type TUpdatePassword = {
  currentPassword: string;
  newPassword: String;
  confirmPassword: string;
};
export default function UpdatePassword() {
  const [loading, isLoading] = useState<boolean>();
  const [error, setError] = useState<any>("");

  const { user } = useAuth();
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

  const onSubmit = async (values: TUpdatePassword) => {
    try {
      isLoading(true);
      const res: any = await changePassword(user?.token, values);
      if (res.passwordUpdated) {
        toast({
          variant: "default",
          description: (
            <div className="flex items-center">
              <CheckIcon color="green" className="mr-2" />
              <span className="first-letter:capitalize">
                Your password updated.
              </span>
            </div>
          ),
          duration: 2000,
        });
        setError(null);
        form.reset({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        isLoading(false);
      } else {
        setError(res?.message);
      }
    } catch (error) {
      isLoading(false);
    }
  };
  return (
    <FormProvider onSubmit={onSubmit} form={form}>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <RHFTextField
              label="Current Password"
              name="currentPassword"
              id="currentPassword"
              type="password"
              placeholder="Enter your current password"
            />
          </div>
          <div className="space-y-2">
            <RHFTextField
              label="New Password"
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter a new password"
            />
          </div>
          <div className="space-y-2">
            <RHFTextField
              label="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
            />
          </div>
        </CardContent>
        {error !== "" && (
          <p className="text-red-500 mb-2 text-center text-sm">{error}</p>
        )}
        <CardFooter>
          <Button type="submit" className="w-full">
            {loading ? <Spinner /> : "Update Password"}
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
