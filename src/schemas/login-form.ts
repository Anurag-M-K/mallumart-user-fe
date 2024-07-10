import { z } from "zod";

// Define a schema for email
const emailSchema = z.string().trim().email({ message: "Invalid email format" }).optional().or(z.literal(''));

// Define a schema for phone number
const phoneSchema = z.string().refine(
  (value) => /^[6789]\d{9,10}$/.test(value),
  {
    message: "Enter a valid phone number",
  }
);

// Define the main schema using a union of email and phone schemas
export const schema = z.object({
  identifier: z.union([emailSchema, phoneSchema]),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password should not be empty" }),
});

export type schemaType = z.infer<typeof schema>;
