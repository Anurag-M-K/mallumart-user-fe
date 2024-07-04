import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  phone: z
    .string()
    .nonempty({ message: "Phone number should not be empty" })
    .regex(/^\d{10}$/, { message: "Enter a valid phone number" }), // Adjust the regex as per your requirement
  name: z
    .string()
    .trim()
    .nonempty({ message: "Name should not be empty" }),
 
});

export type schemaType = z.infer<typeof schema>;
