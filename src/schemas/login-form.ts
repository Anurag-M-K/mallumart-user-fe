import { z } from "zod";

export const schema = z.object({
  email: z.string().email({message:"Enter a valid email address"}),
  password: z
    .string()
    .trim()
    .min(1, { message: "password should not be empty" }),
});

export type schemaType = z.infer<typeof schema>;
