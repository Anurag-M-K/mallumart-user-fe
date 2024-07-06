import { z } from "zod";

function isValidPhoneNumber(value:any) {
    // Example regex for US phone numbers
    // Adjust the regex according to your needs for international formats
    return /^\d{10}$/.test(value);
  }
export const schema = z.object({
  phone: z.string().refine(isValidPhoneNumber,{
    message:"Enter a valid phone number"
  })
});

export type schemaType = z.infer<typeof schema>;
