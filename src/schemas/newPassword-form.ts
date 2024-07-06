import { z } from "zod";

// Schema definition
export const schema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // This will target the 'confirmPassword' field
});

export type schemaType = z.infer<typeof schema>;
