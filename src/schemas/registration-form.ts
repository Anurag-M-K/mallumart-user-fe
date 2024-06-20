import { z } from "zod";

export const schema = z.object({
  fullName: z.string().trim().min(1, {
    message: "name is required",
  }),
  phone: z.number().refine(
    (value) => {
      const phoneNumberString = String(value);
      return /^[6789]\d{9,10}$/.test(phoneNumberString);
    },
    {
      message: "Enter valid phone number",
    }
  ),
  password: z.string().min(6, { message: "minimum 6 value" }),
  email:z.string().trim().min(1, {
    message: "Email is required",
  }),
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export type schemaType = z.infer<typeof schema>;
