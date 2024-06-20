import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Typography } from "../Typography/Typography";

// ----------------------------------------------------------------------

type Props = {
  name: string;
  label: string;
  helperText?: string;
};

export default function RHFOTPField({ name, label, helperText }: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <Typography variant="span" className="!font-medium">
              {label}
            </Typography>
          </FormLabel>
          <FormControl>
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormDescription>
            <Typography variant="helperText">{helperText}</Typography>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
