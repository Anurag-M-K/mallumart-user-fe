import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Typography } from "../Typography/Typography";

// ----------------------------------------------------------------------

type Props = InputProps & {
  name: string;
  label: string;
  helperText?: string;
};

export default function RHFTextField({ name, label, type, helperText }: Props) {
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
            <Input
              {...field}
              type={type}
              placeholder=""
              value={type === "number" && field.value === 0 ? "" : field.value}
              onChange={(event) => {
                if (type === "number") {
                  field.onChange(Number(event.target.value));
                } else {
                  field.onChange(event.target.value);
                }
              }}
            />
          </FormControl>
          <FormDescription>{helperText}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
